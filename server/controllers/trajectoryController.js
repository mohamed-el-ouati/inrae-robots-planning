const pool = require("../services/db");
const fs = require("fs");
const proj4 = require("proj4");

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

exports.getTrajectoriesPointsByPlotId = async (req, res) => {
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

exports.getAllTrajectoriesPoints = async (req, res) => {
  const query = `SELECT id, point, ord_id FROM public.point_timeref ORDER BY id ASC, ord_id ASC;`;
  try {
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getAllTrajectoriesWithoutPoints = async (req, res) => {
  const query = `SELECT tr.id, tr.name, r.name AS robot_name, act.name AS activity_name, p.name AS plot_name FROM public.trajectory_ref tr
                 LEFT JOIN robot r ON r.id = tr.robot_id
                 LEFT JOIN plot p ON p.id = tr.plot_id
                 LEFT JOIN activity act ON act.id = tr.activity_id
                     `;
  try {
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getTrajectoryById = async (req, res) => {
  const query = `SELECT pt.id, pt.point, pt.ord_id, p.name as plot_name, tr.name as traj_name, r.name AS robot_name, act.name AS activity_name, r.id AS robot_id, act.id AS activity_id
  FROM public.point_timeref pt
  LEFT JOIN public.plot p ON ST_Within(ST_SetSRID(pt.point, 4326), p.geom)	
  LEFT JOIN trajectory_ref tr ON tr.id = pt.id
  LEFT JOIN robot r ON r.id = tr.robot_id
  LEFT JOIN activity act ON act.id = tr.activity_id
  where tr.id = $1
  ORDER BY pt.id ASC, pt.ord_id ASC`;
  const { id } = req.params;

  try {
    const data = await pool.query(query, [id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows);
    } else {
      res.status(404).json({ message: "Trajectory not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrajectoryPointsById = async (req, res) => {
  const query = `
    SELECT pt.id, pt.point, pt.ord_id, pt.speed, pt.storage_timestamp
    FROM point_timeref pt
    LEFT JOIN trajectory_ref tr ON tr.id = pt.id
    WHERE tr.id = $1
    ORDER BY pt.id ASC, pt.ord_id ASC
  `;

  const { id } = req.params;

  try {
    const result = await pool.query(query, [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.insertTrajectory = async (req, res) => {
  try {
    const { name, robot_id, activity_id } = req.body;

    const query = `
      INSERT INTO trajectory_ref (name, robot_id, activity_id)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const data = await pool.query(query, [name, robot_id, activity_id]);
    res.status(201).json({
      message: "Trajectory inserted successfully",
      trajectory: data.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insertTrajectoryPoints = async (req, res) => {
  try {
    const { id, filePath } = req.body;

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const [originLon, originLat, originAlt] = data.origin.coordinates;
    const points = data.points.values;
    const localPoints = points.map((point) => [point[1], point[0]]);

    const wgs84 = proj4.defs("EPSG:4326");
    const localProj = `+proj=aeqd +lat_0=${originLat} +lon_0=${originLon} +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs`;

    const geoPoints = localPoints.map((point, index) => {
      // Extract speed from the current point's array (if available)
      const speed = points[index][2] || 0.0; // Use provided speed or default to 0.0
      const transformedPoint = proj4(localProj, wgs84, point);
      return [transformedPoint[0], transformedPoint[1], speed];
    });

    const query =
      "INSERT INTO public.point_timeref (id, point, speed, ord_id, storage_timestamp) VALUES ($1, ST_GeomFromText($2, 4326), $3, $4, $5)";

    let ordId = 1;
    for (const [lon, lat, speed] of geoPoints) {
      const storageTimestamp = new Date(2022, 11, 22);

      const values = [
        id,
        `POINT(${lat} ${lon})`,
        speed,
        ordId,
        storageTimestamp,
      ];
      await pool.query(query, values);
      ordId++;
    }

    res.status(201).json({
      message: "Trajectory inserted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrajectoryRef = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM trajectory_ref WHERE id = $1",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Trajectory Ref deleted successfully" });
    } else {
      res.status(404).json({ message: "Trajectory Ref not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrajectoryPoints = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM point_timeref WHERE id = $1", [
      id,
    ]);

    if (result.rowCount > 0) {
      res
        .status(200)
        .send({ message: "Trajectory points deleted successfully" });
    } else {
      res.status(404).json({ message: "Trajectory points not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlotContainingTrajectory = async (req, res) => {
  const query = `
       WITH trajectory_points AS (
         SELECT p.id AS plot_id, p.name AS plot_name, COUNT(*) AS point_count
         FROM point_timeref pt
         JOIN trajectory_ref tr ON tr.id = pt.id
         JOIN plot p ON ST_Within(ST_SetSRID(pt.point, 4326), p.geom)
         WHERE tr.id = $1
         GROUP BY p.id, p.name
     ),
     most_containing_plot AS (
         SELECT plot_id, plot_name
         FROM trajectory_points
         ORDER BY point_count DESC
         LIMIT 1
     )
     SELECT plot_id, plot_name
     FROM most_containing_plot;
  `;

  const { id } = req.params;

  try {
    const data = await pool.query(query, [id]);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows[0]);
    } else {
      res.status(404).json({ message: "Plot not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTrajectory = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Building the SET part of the SQL query dynamically based on the fields provided in the request body.
  const setString = Object.keys(updateFields)
    .map((key, index) => {
      return `"${key}" = $${index + 2}`;
    })
    .join(", ");

  if (setString.length === 0) {
    return res.status(400).send({ message: "No fields provided for update" });
  }

  const values = [id, ...Object.values(updateFields)];

  try {
    const result = await pool.query(
      `UPDATE trajectory_ref SET ${setString} WHERE id = $1`,
      values
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Trajectory updated successfully" });
    } else {
      res.status(404).json({ message: "Trajectory not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
