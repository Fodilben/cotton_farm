export default async function handler(req, res) {
  if (req.method === "POST") {
    const { todayTasks, habitTasks, completedTasks } = req.body;

    try {
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
