const pool = require("../services/db");

exports.getEquipmentNames = async (req, res) => {
  try {
    const data = await pool.query("SELECT id, name FROM tool_sprayer");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getAvailableEquipments = async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = `
     SELECT ts.id, ts.name
      FROM tool_sprayer ts
      WHERE NOT EXISTS (
         SELECT 1
         FROM configuration c
         WHERE c.equipment_id = ts.id
         AND (
               (c.start_date <= $2 AND c.end_date >= $1)
               OR (c.start_date >= $1 AND c.end_date <= $2)
               OR (c.start_date <= $1 AND c.end_date >= $2)
         )
     );`;
    const data = await pool.query(query, [start, end]);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
