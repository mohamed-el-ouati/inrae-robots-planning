const pool = require("../services/db");

exports.getAllActivities = async (req, res) => {
  try {
    const sqlQuery = `
    SELECT a.id, a.name, cat.name as category FROM activity a 
    LEFT JOIN activity_categories cat ON cat.id = a.category_id;
  `;

    const data = await pool.query(sqlQuery);
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.insertActivity = async (req, res) => {
  const { name, category_id } = req.body;

  try {
    const query =
      "INSERT INTO activity (name, category_id) VALUES ($1, $2) RETURNING *";
    const values = [name, category_id];

    const data = await pool.query(query, values);
    res.status(201).json({
      message: "Successfully added Activity!",
      activity: data.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM activity WHERE id = $1", [id]);

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Activity deleted successfully" });
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActivitiesByCategoryId = async (req, res) => {
  const { category_id } = req.params;

  try {
    const query = "SELECT id, name FROM activity WHERE category_id = $1";
    const values = [category_id];

    const data = await pool.query(query, values);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows);
    } else {
      res
        .status(404)
        .json({ message: "No activities found for this category" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
