const pool = require("../services/db");

exports.getRobotsPowerCategories = async (req, res) => {
  try {
    const data = await pool.query("SELECT id, class FROM powercategory_robot");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};
