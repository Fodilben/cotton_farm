export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body; //  JSON data from the request body

      // Inserting to Supabase
      const { error } = await supabase.from("progress").insert([data]);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error saving data", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
