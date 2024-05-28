const fs = require("fs");
const { Client } = require("pg");
const proj4 = require("proj4");

const file_path = "montoldre_demo4.traj";

const data = JSON.parse(fs.readFileSync(file_path, "utf8"));

const [origin_lon, origin_lat, origin_alt] = data.origin.coordinates;
const points = data.points.values;

const local_points = points.map((point) => [point[0], point[1]]);

const wgs84 = "EPSG:4326"; // WGS84
const local_proj = proj4(
  "+proj=aeqd +lat_0=" + origin_lat + " +lon_0=" + origin_lon
);

const geo_points = local_points.map((point) => proj4(local_proj, point));

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "db6",
  password: "1919",
  port: 5432,
});

client.connect();
const insert_query =
  "INSERT INTO public.point_timeref (id, point, speed, ord_id, storage_timestamp) VALUES (128, ST_GeomFromText('SRID=4326;POINT($1 $2)'), $3, $4, $5)";

const speed = 0.0;
const storage_timestamp = "2022-12-22";
let ord_id = 0;

async function insertData() {
  for (const [lon, lat] of geo_points) {
    ord_id++;
    await client.query(insert_query, [
      lon,
      lat,
      speed,
      ord_id + 1,
      storage_timestamp,
    ]);
  }
  client.end();
}

insertData().catch((err) => console.error(err));
