const pool = require("../services/db");
const fs = require("fs");
const path = require("path");

exports.getAvailableEquipments = async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = `
     SELECT  e.id, e.name, e.working_width_m, e.required_power_kw, e.weight_kg, e.image
      FROM equipment e
      WHERE NOT EXISTS (
         SELECT 1
         FROM configuration c
         WHERE c.equipment_id = e.id
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

exports.insertEquipment = async (req, res) => {
  const {
    name,
    working_width_m,
    trailed_or_carried,
    required_power_kw,
    number_of_teeth,
    tooth_width_cm,
    capacity_l,
    hitch,
    pneumatic,
    power_take_off,
    hitch_ground_clearance,
    weight_kg,
    imagePath,
  } = req.body;

  const query = `
    INSERT INTO equipment (
      name,
      working_width_m,
      trailed_or_carried,
      required_power_kw,
      number_of_teeth,
      tooth_width_cm,
      capacity_l,
      hitch,
      pneumatic,
      power_take_off,
      hitch_ground_clearance,
      weight_kg,
      image
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
    )
  `;

  const absoluteImagePath = path.resolve(imagePath);
  const imageData = fs.readFileSync(absoluteImagePath);

  try {
    await pool.query(query, [
      name,
      working_width_m,
      trailed_or_carried,
      required_power_kw,
      number_of_teeth,
      tooth_width_cm,
      capacity_l,
      hitch,
      pneumatic,
      power_take_off,
      hitch_ground_clearance,
      weight_kg,
      imageData,
    ]);
    res.status(200).send({ message: "Equipment inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEquipments = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM equipment");
    if (data.rows.length > 0) {
      res.status(200).send(data.rows);
    } else {
      res.status(404).json({ message: "No equipment found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEquipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query("SELECT * FROM equipment WHERE id = $1", [
      id,
    ]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEquipment = async (req, res) => {
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
      `UPDATE equipment SET ${setString} WHERE id = $1`,
      values
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Equipment updated successfully" });
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM equipment WHERE id = $1", [
      id,
    ]);

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Equipment deleted successfully" });
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
