const pool = require("../services/db");

exports.getAllConfigurations = async (req, res) => {
  try {
    const sqlQuery = `
      SELECT
      	c.id,
      	c.start_date,
        c.end_date,
      	a.name AS activity_name,
      	a.id AS activity_id,
      	r.name AS robot_name,
      	r.id AS robot_id,
      	p.name AS plot_name,
      	p.id AS plot_id
      FROM 
          configuration c
      LEFT JOIN 
          activity a ON a.id = c.activity_id 
      LEFT JOIN 
          robot r ON r.id = c.robot_id 
      LEFT JOIN 
          plot p ON c.plot_id = p.id`;

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

exports.addConfiguration = async (req, res) => {
  const {
    robot_id,
    activity_id,
    equipment_id,
    start_date,
    end_date,
    plot_id,
    itk_id,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO configuration (
        robot_id, activity_id, equipment_id, start_date, end_date, plot_id, itk_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING id`, // Add RETURNING id to get the inserted ID
      [
        robot_id,
        activity_id,
        equipment_id,
        start_date,
        end_date,
        plot_id,
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
        c.id AS task_id,
        c.robot_id,
        c.activity_id,
        c.equipment_id,
        c.start_date,
        c.end_date,
        c.itk_id,
        c.plot_id,
        c.trajectory_id,
	      i.name AS itk_name,
	      p.name AS plot_name,
        tr.name AS trajectory_name,
        r.name AS robot_name,
        e.name AS equipment_name,
        a.name AS activity_name,
	      cat.name AS activity_category_name,
	      cat.id AS activity_category_id
      FROM 
        configuration c
      LEFT JOIN robot r ON c.robot_id = r.id
      LEFT JOIN equipment e ON c.equipment_id = e.id
	    LEFT JOIN plot p ON c.plot_id = p.id
	    LEFT JOIN itk i ON c.itk_id = i.id
      LEFT JOIN trajectory_ref tr ON c.trajectory_id = tr.id
      INNER JOIN activity a ON c.activity_id = a.id
      LEFT JOIN activity_categories cat ON cat.id = a.category_id
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

exports.deleteConfigurationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM configuration WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).send({ message: "Successfully deleted configuration" });
    } else {
      res.status(404).json({ message: "Configuration not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteConfigurationByItkId = async (req, res) => {
  const { itk_id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM configuration WHERE itk_id = $1 RETURNING id`,
      [itk_id]
    );

    if (result.rows.length > 0) {
      res.status(200).send({ message: "Successfully deleted configurations" });
    } else {
      res.status(404).json({ message: "Configurations not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksByItkId = async (req, res) => {
  const { itk_id } = req.params;
  const sqlQuery = `SELECT c.id AS configuration_id FROM configuration c WHERE c.itk_id = $1`;
  try {
    const data = await pool.query(sqlQuery, [itk_id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows);
    } else {
      res.status(404).json({ message: "No tasks found for this ITK ID" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateConfiguration = async (req, res) => {
  const {
    robot_id,
    activity_id,
    equipment_id,
    start_date,
    end_date,
    itk_id,
    plot_id,
    trajectory_id,
  } = req.body;

  // Extract `id` from URL parameters
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Configuration ID is required" });
  }

  // Construct the dynamic SQL update query
  const updates = [];
  const values = [];
  let counter = 1;

  // Adding fields to update only if they are provided in the request
  if (robot_id !== undefined) {
    updates.push(`robot_id = $${counter++}`);
    values.push(robot_id);
  }
  if (plot_id !== undefined) {
    updates.push(`plot_id = $${counter++}`);
    values.push(plot_id);
  }
  if (trajectory_id !== undefined) {
    updates.push(`trajectory_id = $${counter++}`);
    values.push(trajectory_id);
  }
  if (activity_id !== undefined) {
    updates.push(`activity_id = $${counter++}`);
    values.push(activity_id);
  }
  if (equipment_id !== undefined) {
    updates.push(`equipment_id = $${counter++}`);
    values.push(equipment_id);
  }
  if (start_date !== undefined) {
    updates.push(`start_date = $${counter++}`);
    values.push(start_date);
  }
  if (end_date !== undefined) {
    updates.push(`end_date = $${counter++}`);
    values.push(end_date);
  }
  if (itk_id !== undefined) {
    updates.push(`itk_id = $${counter++}`);
    values.push(itk_id);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  // Add the ID to the end of the values array
  values.push(id);

  // Construct the final query string
  const query = `
    UPDATE configuration
    SET ${updates.join(", ")}
    WHERE id = $${counter}
    RETURNING id
  `;

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Configuration not found" });
    }

    const updatedId = result.rows[0].id;

    res
      .status(200)
      .send({ id: updatedId, message: "Configuration updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
