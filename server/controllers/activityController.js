const pool = require("../services/db");

exports.getActivitiesNames = async (req, res) => {
  try {
    const data = await pool.query("SELECT id, name FROM activity");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getAvailableActivities = async (req, res) => {
  try {
    const sqlQuery = `
      SELECT a.id, a.name
      FROM activity a;
    `;
    const data = await pool.query(sqlQuery);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    } else {
      res.status(404).json({ message: "No activities found" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const data = await pool.query("SELECT id, name FROM activity");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getAllActivitiesInfos = async (req, res) => {
  try {
    const sqlQuery = `
      SELECT a.id, a.name, act.name as category FROM activity a 
      LEFT JOIN activity_categories act ON act.id = a.category_id;
    `;
    const data = await pool.query(sqlQuery);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    } else {
      res.status(404).json({ message: "No activities found" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
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
