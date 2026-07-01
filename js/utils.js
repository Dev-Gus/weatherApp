/**
 * Format a time string into a readable time and date string
 * @param {string} time - ISO time string
 * @returns {string} - Formatted string (e.g. "10:30 AM - 15/05/2023")
 */
export const formatTime = (time) => {
  const date = new Date(time);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = date.toLocaleDateString("en-GB");

  return `${formattedTime} - ${formattedDate}`;
};

/**
 * Check if the weather code indicates precipitation (rain, snow, drizzle)
 * @param {number} weatherCode - WMO weather code
 * @returns {boolean} - True if precipitation is expected
 */
export const isPrecipitation = (weatherCode) => {
  const precipitationCodes = [
    51,
    53,
    55,
    56,
    57, // Drizzle
    61,
    63,
    65,
    66,
    67, // Rain
    71,
    73,
    75,
    77, // Snow
    80,
    81,
    82, // Rain showers
    85,
    86, // Snow showers
    95,
    96,
    99, // Thunderstorm
  ];

  return precipitationCodes.includes(weatherCode);
};

/**
 * Get weather warning message based on WMO weather code
 * @param {number} code - WMO weather code
 * @returns {string} - Weather warning message
 */
export const getWeatherWarning = (code) => {
  if (code >= 95)
    return "Thunderstorm alert! Stay indoors and avoid open areas.";
  if (code >= 71 && code <= 86)
    return "Snowing outside. Drive carefully and wear warm clothes!";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return "It's raining. Don't forget your umbrella!";
  }
  return "Adverse weather conditions. Please be careful.";
};
