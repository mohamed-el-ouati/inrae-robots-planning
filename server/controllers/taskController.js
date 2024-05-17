const pool = require("../services/db");

exports.getAllTasks = async (req, res) => {
  try {
    const sqlQuery = `
  SELECT 
	c.start_date,
  c.end_date,
	a.name AS activity_name,
	a.id AS activity_id,
	r.name AS robot_name,
	r.id AS robot_id,
	p.name AS plot_name,
	p.id AS plot_id,
	tr.name AS trajectory_name,
	tr.id AS trajectory_id,
	c.id AS configuration_id,
  cr.id AS configuration_ref_id
  FROM 
    configuration_ref cr
  LEFT JOIN 
    trajectory_ref tr ON tr.id = cr.trajectory_ref_id
  LEFT JOIN 
    configuration c ON c.id = cr.configuration_id
  LEFT JOIN 
    activity a ON a.id = c.activity_id 
  LEFT JOIN 
    robot r ON r.id = c.robot_id 
  LEFT JOIN 
    plot p ON tr.plot_id = p.id`;

    const data = await pool.query(sqlQuery);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows); // Send the configurations with activity names
    } else {
      res.status(404).json({ message: "No configurations found" }); // If no configurations are found
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal server error
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const sqlQuery = `
      SELECT 
      	 c.start_date,
         c.end_date,
	       a.name AS activity_name,
	       a.id AS activity_id,
	       r.name AS robot_name,
	       r.id AS robot_id,
	       p.name AS plot_name,
	       p.id AS plot_id,
	       tr.name AS trajectory_name,
	       tr.id AS trajectory_id,
	       c.id AS configuration_id,
	       cr.id AS configuration_ref_id
         FROM 
           configuration_ref cr
         LEFT JOIN 
           trajectory_ref tr ON tr.id = cr.trajectory_ref_id
         LEFT JOIN 
           configuration c ON c.id = cr.configuration_id
         LEFT JOIN 
           activity a ON a.id = c.activity_id 
         LEFT JOIN 
           robot r ON r.id = c.robot_id 
         LEFT JOIN 
           plot p ON tr.plot_id = p.id
         Where cr.id = $1`;
    const data = await pool.query(sqlQuery, [id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
