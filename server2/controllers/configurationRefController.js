const pool = require("../services/db");

exports.addConfigurationRef = async (req, res) => {
  const { configuration_id, trajectory_ref_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO configuration_ref (
	     configuration_id, trajectory_ref_id)
       VALUES ($1, $2)`,
      [configuration_id, trajectory_ref_id]
    );
    res
      .status(200)
      .send({ message: "Successfully added configuration reference" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteConfigurationRef = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM configuration_ref WHERE id = $1",
      [id]
    );

    if (result.rowCount > 0) {
      res
        .status(200)
        .send({ message: "Configuration ref deleted successfully" });
    } else {
      res.status(404).json({ message: "Configuration ref not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteConfigurationRefByConfigurationId = async (req, res) => {
  const { configuration_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM configuration_ref WHERE configuration_id = $1",
      [configuration_id]
    );

    if (result.rowCount > 0) {
      res
        .status(200)
        .send({ message: "Configuration refs deleted successfully" });
    } else {
      res.status(404).json({ message: "Configuration refs not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
