const wkx = require("wkx");

/**
 * Converts Well-Known Binary (WKB) string JSON structure
 * @param {Array} wkbDataArray - The Well-Known Binary array to convert.
 * @returns {JSON} JSON structure
 */

exports.convertToJSON = (data) => {
  if (data.length === 0) {
    throw new Error("No data to process");
  }

  const points = data.map((row) => {
    const geom = wkx.Geometry.parse(Buffer.from(row.geom, "hex"));
    const coordinates = geom.toGeoJSON().coordinates;
    return [coordinates[0], coordinates[1], row.speed];
  });

  return {
    version: "2",
    origin: {
      type: "WGS84",
      coordinates: [
        points[0][0],
        points[0][1],
        points[0][2], // Assuming the first point has an altitude for origin
      ],
    },
    points: {
      columns: ["x", "y", "speed"],
      values: points,
    },
  };
};
