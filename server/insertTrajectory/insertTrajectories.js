const { Client } = require("pg");
const values = require("./traj"); // Assuming traj.js exports the values array
// PostgreSQL client setup
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1919",
  database: "db6",
});

// Function to insert data into PostgreSQL
async function insertData(values) {
  try {
    await client.connect();
    for (let i = values.length - 1; i >= 0; i--) {
      const item = values[i];
      const lng = item[0];
      const lat = item[1];
      const speed = item[2];
      const storage_timestamp = null;

      const query = `
        INSERT INTO public.point_timeref(id, point, speed, ord_id, storage_timestamp)
        VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4, $5, $6)
      `;
      const queryValues = [108, lng, lat, speed, i, storage_timestamp];

      await client.query(query, queryValues);
    }
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.end(); // Close the connection
  }
}
// Call the function to insert data
insertData(values);
