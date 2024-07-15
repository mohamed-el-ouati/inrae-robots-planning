const pool = require("../services/db");
const fs = require("fs");
const proj4 = require("proj4");
const wkx = require("wkx");

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

exports.getAllTrajectoriesPoints = async (req, res) => {
  const query = `SELECT id, point, ord_id FROM public.point_timeref ORDER BY id ASC, ord_id ASC;`;
  try {
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

// For list view
exports.getAllTrajectoriesList = async (req, res) => {
  const query = `SELECT id, plot_name, traj_name
  FROM (
      SELECT pt.id,  p.name AS plot_name, tr.name AS traj_name,
             ROW_NUMBER() OVER (PARTITION BY tr.name ORDER BY pt.ord_id ASC) AS rn
      FROM point_timeref pt
      LEFT JOIN plot p ON ST_Within(ST_SetSRID(pt.point, 4326), p.geom)
      LEFT JOIN trajectory_ref tr ON tr.id = pt.id
  ) subquery
  WHERE rn = 1 ORDER BY id ASC;`;
  try {
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getTrajectoryById = async (req, res) => {
  const query = `SELECT pt.id, pt.point, pt.ord_id, p.name as plot_name, tr.name as traj_name
  FROM public.point_timeref pt
  LEFT JOIN public.plot p ON ST_Within(ST_SetSRID(pt.point, 4326), p.geom)	
  LEFT JOIN trajectory_ref tr ON tr.id = pt.id
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

exports.insertTrajectoryName = async (req, res) => {
  try {
    const { name } = req.body;
    const query = `
      INSERT INTO trajectory_ref (name)
      VALUES ($1)
      RETURNING id;
    `;
    const data = await pool.query(query, [name]);
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
  try {
    const data = await fetchData();
    const result = convertToJSON(data);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error processing data", err);
  }
};

//////////////\\\\\\\\\\\\\\
exports.getTrajectoryJSONById = async (req, res) => {
  const query = `SELECT pt.id, pt.point, pt.ord_id, pt.speed
  FROM public.point_timeref pt
  LEFT JOIN trajectory_ref tr ON tr.id = pt.id
  where tr.id = $1
  ORDER BY pt.id ASC, pt.ord_id ASC`;

  const { id } = req.params;

  try {
    const data = await pool.query(query, [id]);

    if (data.rows.length > 0) {
      // Convert data to the desired JSON structure
      const points = data.rows.map((row) => {
        const geom = wkx.Geometry.parse(Buffer.from(row.point, "hex"));
        const coordinates = geom.toGeoJSON().coordinates;
        return [coordinates[0], coordinates[1], row.speed];
      });

      const responseJson = {
        version: "2",
        origin: {
          type: "WGS84",
          coordinates: [
            points[0][0],
            points[0][1],
            points[0][2], // Assuming the first point has an altitude or ordinal for origin
          ],
        },
        points: {
          columns: ["x", "y", "speed"],
          values: points,
        },
      };

      res.status(200).json(responseJson);
    } else {
      res.status(404).json({ message: "Trajectory not found" });
    }
  } catch (error) {
    console.error("Error processing data", error);
    res.status(500).json({ error: error.message });
  }
};
