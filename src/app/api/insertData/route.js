export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      focusStatistics,
      focusRecord,
      todayTasks,
      habitTasks,
      completedTasks,
    } = req.body;

    try {
      // Insert into the pomos table
      const { data: pomoData, error: pomoError } = await supabase
        .from("pomos")
        .insert([
          {
            todays_pomos: focusStatistics.todaysPomos,
            todays_focus_time: focusStatistics.todaysFocusTime,
            total_pomos: focusStatistics.totalPomos,
            total_focus_duration: focusStatistics.totalFocusDuration,
          },
        ])
        .select(); // Select inserted record to get the ID

      if (pomoError) throw pomoError;

      const pomoId = pomoData[0].id;

      // Insert into the focus_record table
      const focusRecords = focusRecord.map((record) => ({
        pomo_id: pomoId,
        time_start: record.time.split(" - ")[0],
        time_end: record.time.split(" - ")[1],
        activity: record.activity,
        duration: record.duration,
      }));

      const { error: focusRecordError } = await supabase
        .from("focus_record")
        .insert(focusRecords);

      if (focusRecordError) throw focusRecordError;

      // Insert today's tasks
      const todayTaskRecords = todayTasks.map((task) => ({
        name: task.name,
        category: task.category,
        status: task.status,
      }));

      const { error: todayTaskError } = await supabase
        .from("tasks")
        .insert(todayTaskRecords);

      if (todayTaskError) throw todayTaskError;

      // Insert habit tasks
      const habitTaskRecords = habitTasks.map((task) => ({
        name: task.name,
        status: task.status,
        type: "habitTasks",
      }));

      const { error: habitTaskError } = await supabase
        .from("tasks")
        .insert(habitTaskRecords);

      if (habitTaskError) throw habitTaskError;

      // Insert completed tasks
      const completedTaskRecords = completedTasks.map((task) => ({
        name: task.name,
        category: task.category,
        status: task.status,
        type: "completedTasks",
      }));

      const { error: completedTaskError } = await supabase
        .from("tasks")
        .insert(completedTaskRecords);

      if (completedTaskError) throw completedTaskError;

      // If everything is inserted successfully
      res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error inserting data", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
