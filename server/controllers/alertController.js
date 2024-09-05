const pool = require("../services/db");

exports.getAllAlerts = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM alert");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

