const pool = require("../services/db");

exports.getAllItks = async (req, res) => {
  try {
    const query = `
        SELECT
          itk.id,
          itk.name,
          MIN(c.start_date) AS itk_start_date,
          MAX(c.end_date) AS itk_end_date
        FROM
          itk itk
        LEFT JOIN
          configuration c ON itk.id = c.itk_id
        GROUP BY
          itk.id, itk.name;`;
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItk = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO itk (name) VALUES ($1) RETURNING id`,
      [name]
    );
    const insertedId = result.rows[0].id;

    res.status(200).send({ id: insertedId, message: "Successfully added ITK" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItkById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM itk WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).send({ message: "Successfully deleted ITK" });
    } else {
      res.status(404).json({ message: "ITK not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItkTasksById = async (req, res) => {
  const { id } = req.params;
  try {
    const sqlQuery = `
  SELECT
    r.name AS robot_name,
    a.name AS activity_name,
    p.name AS plot_name,
    tr.name AS trajectory_name,
    eq.name AS equipment_name,
    c.start_date,
    c.end_date,
    i.name AS itk_name,
	  i.id AS itk_id,
    c.id AS task_id
  FROM
    configuration c
  LEFT JOIN
    robot r ON c.robot_id = r.id
  LEFT JOIN
    activity a ON c.activity_id = a.id
  JOIN
    itk i ON c.itk_id = i.id
  LEFT JOIN
    trajectory_ref tr ON c.trajectory_id = tr.id
  LEFT JOIN
    equipment eq ON c.equipment_id = eq.id
  LEFT JOIN
    plot p ON c.plot_id = p.id
  WHERE
    i.id = $1`;
    const data = await pool.query(sqlQuery, [id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows);
    } else {
      res.status(404).json({ message: "ITK not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
