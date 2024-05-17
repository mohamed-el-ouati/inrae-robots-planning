const pool = require("../services/db");

exports.addConfiguration = async (req, res) => {
  const {
    workdurationmax,
    workspeedmax,
    timemount,
    timeunmount,
    robot_id,
    activity_id,
    equipment_id,
    start_date,
    end_date,
    itk_id,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO configuration (
        workdurationmax, workspeedmax, timemount, timeunmount, robot_id,
        activity_id, equipment_id, start_date, end_date, itk_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING id`, // Add RETURNING id to get the inserted ID
      [
        workdurationmax,
        workspeedmax,
        timemount,
        timeunmount,
        robot_id,
        activity_id,
        equipment_id,
        start_date,
        end_date,
        itk_id,
      ]
    );

    const insertedId = result.rows[0].id;

    res
      .status(200)
      .send({ id: insertedId, message: "Configuration inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConfigurationById = async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `
      SELECT 
        c.*,
        r.name AS robot_name,
        e.name AS equipment_name,
        a.name AS activity_name
      FROM 
        configuration c
      LEFT JOIN robot r ON c.robot_id = r.id
      LEFT JOIN tool_sprayer e ON c.equipment_id = e.id
      INNER JOIN activity a ON c.activity_id = a.id
      WHERE c.id = $1`;
  try {
    const data = await pool.query(sqlQuery, [id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(404).json({ message: "Robot not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
