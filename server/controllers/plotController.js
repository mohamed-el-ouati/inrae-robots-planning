const pool = require("../services/db");

exports.getPlotNames = async (req, res) => {
  try {
    const query = `
     SELECT p.id, p.name
       FROM plot p
       JOIN trajectory_ref tr ON p.id = tr.plot_id;
    `;
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPlots = async (req, res) => {
  try {
    const query = `
     SELECT p.id, p.name, p.geom FROM plot p;
    `;
    const data = await pool.query(query);
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlotById = async (req, res) => {
  const query = `
  SELECT p.id, p.name, p.geom FROM plot p
  where p.id = $1;`;
  const { id } = req.params;

  try {
    const data = await pool.query(query, [id]);
    if (data.rows.length > 0) {
      res.status(200).send(data.rows);
    } else {
      res.status(404).json({ message: "Plot not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
