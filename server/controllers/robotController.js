const pool = require("../services/db");

exports.getAllRobots = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM robot");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getAvailableRobots = async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = `
     SELECT r.id, r.name, r.description, r.image_data, r.puissance_kwh, r.operating_time
      FROM robot r
      WHERE NOT EXISTS (
         SELECT 1
         FROM configuration c
         WHERE c.robot_id = r.id
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

exports.getRobotsEssentialInfo = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT id, name, description, image_data FROM robot"
    );
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.getRobotById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query("SELECT * FROM robot WHERE id = $1", [id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(404).json({ message: "Robot not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRobot = async (req, res) => {
  const {
    weight,
    name,
    description,
    puissance_kwh,
    recharge_time,
    operating_time,
    frontaxle_steeringspeed,
    maxangle_steering,
    rearaxle_steeringspeed,
    id_powercat,
    availableTill,
    steering_wheel,
    driving_wheel,
    dim_length,
    dim_width,
    dim_height,
  } = req.body;
  try {
    await pool.query(
      `INSERT INTO robot (
	     weight, name, description, puissance_kwh, recharge_time, operating_time, frontaxle_steeringspeed, maxangle_steering, rearaxle_steeringspeed, id_powercat, "availableTill", steering_wheel, driving_wheel, dim_length, dim_width, dim_height)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        weight,
        name,
        description,
        puissance_kwh,
        recharge_time,
        operating_time,
        frontaxle_steeringspeed,
        maxangle_steering,
        rearaxle_steeringspeed,
        id_powercat,
        availableTill,
        steering_wheel,
        driving_wheel,
        dim_length,
        dim_width,
        dim_height,
      ]
    );
    res.status(200).send({ message: "Successfully added robot" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRobot = async (req, res) => {
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
      `UPDATE robot SET ${setString} WHERE id = $1`,
      values
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Robot updated successfully" });
    } else {
      res.status(404).json({ message: "Robot not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRobot = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM robot WHERE id = $1", [id]);

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Robot deleted successfully" });
    } else {
      res.status(404).json({ message: "Robot not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
