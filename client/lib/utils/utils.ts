import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAndCapitalize(str: string): string {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Converts a date string from one format to another.
 * @param dateString The date string to convert.
 * @returns The converted date string in the format "DD:MM:YYYY HH:mm:ss".
 */
export function formatDate(date: Date): string {
  // Extract year, month, day, hours, minutes, and seconds from the Date object
  const year = date.getFullYear(); // Get the full year (4 digits)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-11) and add 1 to get the correct month, then pad with leading zero if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Get the day of the month (1-31) and pad with leading zero if necessary
  const hours = String(date.getHours()).padStart(2, "0"); // Get the hours (0-23) and pad with leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get the minutes (0-59) and pad with leading zero if necessary
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Get the seconds (0-59) and pad with leading zero if necessary

  // Construct the desired format: year-month-day hours:minutes:seconds
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Converts an ISO 8601 date string to a readable format (MM/DD/YY HH:MM:SS).
 * @param isoDateString - The ISO 8601 date string to convert.
 * @returns A string representing the date in MM/DD/YY HH:MM:SS format.
 */
export function formatDateString(isoDateString: string): string {
  const date = new Date(isoDateString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Convert time object to readable format (HH:MM:SS).
 * @param {Object} timeObject - The time object containing hours, minutes, and seconds.
 * @returns {string} The time string in HH:MM:SS format.
 */ export function formatDuration(timeObject: {
  hours?: number;
  minutes?: number;
  seconds?: number;
}): string {
  const { hours = 0, minutes = 0, seconds = 0 } = timeObject;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Convert image data array to base64 format.
 * @param {Array} imageData - The image data array.
 * @returns {string} The base64-encoded image string.
 */
export function convertImageDataToBase64(imageData: number[]): string {
  const base64Image = `data:image/jpeg;base64,${btoa(
    imageData.map((byte: any) => String.fromCharCode(byte)).join("")
  )}`;

  return base64Image;
}

const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

export const validateTimeFormat = (timeString: string) => {
  return timePattern.test(timeString);
};

// Function to generate a random color
export const getRandomColor = () => {
  const colors = [
    "#C0392B",
    "#E74C3C",
    "#9B59B6",
    "#F1C40F",
    "#2ECC71",
    "#F1C40F",
    "#F1C40F",
    "#F1C40F",
    "#F1C40F",
    "#F1C40F",
    "#8E44AD",
    "#2980B9",
    "#3498DB",
    "#1ABC9C",
    "#16A085",
    "#27AE60",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Converts an object to an array of key-value pairs.
 * @param obj The object to convert.
 * @returns An array of key-value pairs.
 */
export function convertOjectToKeyValueArray(
  obj: any
): { key: string; value: any }[] {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

export function getNameFromConcatenatedString(
  concatenatedString: string
): string {
  // Split the concatenated string by underscore
  const parts = concatenatedString.split("_");

  // Return the first part (name)
  return parts[0];
}

export function splitNameAndId(concatenatedString: string): {
  name: string;
  id: string;
} {
  const [name, id] = concatenatedString.split("_");
  return { name, id };
}
