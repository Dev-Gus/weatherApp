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
 * Get weather emoji and description from WMO weather code
 * @param {number} code - WMO weather code
 * @returns {{emoji: string, description: string}} - Weather icon and description
 */
export const getWeatherIcon = (code) => {
  const weatherMap = {
    // Clear sky
    0: { emoji: "☀️", description: "Clear Sky" },
    1: { emoji: "🌤️", description: "Mainly Clear" },
    2: { emoji: "⛅", description: "Partly Cloudy" },
    3: { emoji: "☁️", description: "Overcast" },

    // Fog and mist
    45: { emoji: "🌫️", description: "Foggy" },
    48: { emoji: "🌫️", description: "Foggy" },

    // Drizzle
    51: { emoji: "🌧️", description: "Light Drizzle" },
    53: { emoji: "🌧️", description: "Moderate Drizzle" },
    55: { emoji: "🌧️", description: "Dense Drizzle" },

    // Freezing drizzle
    56: { emoji: "❄️", description: "Freezing Drizzle" },
    57: { emoji: "❄️", description: "Freezing Drizzle" },

    // Rain
    61: { emoji: "🌧️", description: "Slight Rain" },
    63: { emoji: "🌧️", description: "Moderate Rain" },
    65: { emoji: "⛈️", description: "Heavy Rain" },

    // Freezing rain
    66: { emoji: "🧊", description: "Freezing Rain" },
    67: { emoji: "🧊", description: "Heavy Freezing Rain" },

    // Snow
    71: { emoji: "❄️", description: "Slight Snow" },
    73: { emoji: "❄️", description: "Moderate Snow" },
    75: { emoji: "❄️", description: "Heavy Snow" },
    77: { emoji: "❄️", description: "Snow Grains" },

    // Snow showers
    80: { emoji: "🌨️", description: "Light Showers" },
    81: { emoji: "🌨️", description: "Moderate Showers" },
    82: { emoji: "⛈️", description: "Heavy Showers" },

    // Snow showers
    85: { emoji: "🌨️", description: "Light Snow Showers" },
    86: { emoji: "🌨️", description: "Heavy Snow Showers" },

    // Thunderstorm
    95: { emoji: "⛈️", description: "Thunderstorm" },
    96: { emoji: "⛈️", description: "Light Thunderstorm with Hail" },
    99: { emoji: "⛈️", description: "Heavy Thunderstorm with Hail" },
  };

  return weatherMap[code] || { emoji: "🌤️", description: "Unknown" };
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
