const pool = require("../services/db");

exports.getAllrequest = async (req, res) => {
  try {
    const sqlQuery = `
    SELECT * from request;
  `;

    const data = await pool.query(sqlQuery);
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};
