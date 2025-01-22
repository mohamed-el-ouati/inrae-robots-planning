import { Geometry } from "wkx";

/**
 * Converts Well-Known Binary (WKB) string to coordinates.
 * @param {string} wkbString - The Well-Known Binary string to convert.
 * @returns {Array} The coordinates array.
 */
export const convertWKBToCoordinates = (wkbString) => {
  const buffer = Buffer.from(wkbString, "hex");
  const geometry = Geometry.parse(buffer);
  return geometry.toGeoJSON().coordinates;
};
