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
