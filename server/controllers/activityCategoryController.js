const pool = require("../services/db");

exports.getAllCategories = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM activity_categories");
    res.status(200).send(data.rows);
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
};

exports.insertCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const query =
      "INSERT INTO activity_categories (name) VALUES ($1) RETURNING *";
    const values = [name];

    const data = await pool.query(query, values);
    res.status(201).json({
      message: "Successfully added Category!",
      data: data.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM activity_categories WHERE id = $1",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).send({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
