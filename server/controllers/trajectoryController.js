const pool = require("../services/db");

exports.getAvailableTrajectories = async (req, res) => {
  try {
    const { end, start, plot_id } = req.query;
    const query = `
      SELECT tr.id, tr.name
      FROM trajectory_ref tr
      LEFT JOIN configuration c ON tr.configuration_id = c.id
      WHERE tr.plot_id = $1
      AND (
          (c.start_date > $2 OR c.end_date < $3)
          OR c.id IS NULL
      )
      GROUP BY tr.id, tr.name;
    `;
    const data = await pool.query(query, [plot_id, end, start]);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrajectoriesPoints = async (req, res) => {
  const query = `
    SELECT pt.*
    FROM public.point_timeref pt
    JOIN public.plot p ON ST_Within(ST_SetSRID(pt.point, 4326), p.geom) 
    WHERE p.id = $1 
    ORDER BY pt.id ASC, pt.ord_id ASC;
  `;

  try {
    const plotId = req.params.id;

    const data = await pool.query(query, [plotId]);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    } else {
      res
        .status(404)
        .json({ message: "No trajectories found for the specified plot" }); // No data found
    }
  } catch (err) {
    console.error("Error querying the database:", err);
    res.sendStatus(500);
  }
};

exports.addTrajectory = async (req, res) => {
  try {
    const { name, id, configuration_id, order, start_date, plot_id } = req.body;
    const query = `
      INSERT INTO trajectory_ref (name, configuration_id, "order", start_date, plot_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const data = await pool.query(query, [
      name,
      configuration_id,
      order,
      start_date,
      plot_id,
    ]);
    res.status(201).json({
      message: "Trajectory inserted successfully",
      trajectory: data.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrajectoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query(
      "SELECT id, name FROM trajectory_ref WHERE id = $1",
      [id]
    );
    if (data.rows.length > 0) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(404).json({ message: "Trajectory not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
