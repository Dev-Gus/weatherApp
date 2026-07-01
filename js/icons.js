import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Snowflake,
  Droplets,
  Wind,
} from "lucide";

/**
 * Create a Lucide SVG icon element
 * @param {Function} IconComponent - Lucide icon constructor
 * @param {Object} [options={}] - Optional SVG attributes
 * @returns {SVGElement} - Configured SVG element
 */
export const createIcon = (iconData, options = {}) => {
  const { width = 24, height = 24, strokeWidth = 1.5, className = "" } = options;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", strokeWidth);
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  if (className) svg.setAttribute("class", className);

  for (const [tag, attrs] of iconData) {
    const child = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) {
      child.setAttribute(k, v);
    }
    svg.appendChild(child);
  }

  return svg;
};

/**
 * WMO weather code to Lucide icon + description mapping
 * @param {number} code - WMO weather code
 * @returns {{ IconComponent: Function, description: string }}
 */
export const getWeatherIcon = (code) => {
  const weatherMap = {
    0:  { IconComponent: Sun,            description: "Clear Sky" },
    1:  { IconComponent: CloudSun,       description: "Mainly Clear" },
    2:  { IconComponent: CloudSun,       description: "Partly Cloudy" },
    3:  { IconComponent: Cloud,          description: "Overcast" },
    45: { IconComponent: CloudFog,       description: "Foggy" },
    48: { IconComponent: CloudFog,       description: "Foggy" },
    51: { IconComponent: CloudDrizzle,   description: "Light Drizzle" },
    53: { IconComponent: CloudDrizzle,   description: "Moderate Drizzle" },
    55: { IconComponent: CloudDrizzle,   description: "Dense Drizzle" },
    56: { IconComponent: Snowflake,      description: "Freezing Drizzle" },
    57: { IconComponent: Snowflake,      description: "Freezing Drizzle" },
    61: { IconComponent: CloudRain,      description: "Slight Rain" },
    63: { IconComponent: CloudRain,      description: "Moderate Rain" },
    65: { IconComponent: CloudRain,      description: "Heavy Rain" },
    66: { IconComponent: Droplets,       description: "Freezing Rain" },
    67: { IconComponent: Droplets,       description: "Heavy Freezing Rain" },
    71: { IconComponent: CloudSnow,      description: "Slight Snow" },
    73: { IconComponent: CloudSnow,      description: "Moderate Snow" },
    75: { IconComponent: CloudSnow,      description: "Heavy Snow" },
    77: { IconComponent: Snowflake,      description: "Snow Grains" },
    80: { IconComponent: CloudRain,      description: "Light Showers" },
    81: { IconComponent: CloudRain,      description: "Moderate Showers" },
    82: { IconComponent: CloudLightning, description: "Heavy Showers" },
    85: { IconComponent: CloudSnow,      description: "Light Snow Showers" },
    86: { IconComponent: CloudSnow,      description: "Heavy Snow Showers" },
    95: { IconComponent: CloudLightning, description: "Thunderstorm" },
    96: { IconComponent: CloudLightning, description: "Thunderstorm with Hail" },
    99: { IconComponent: CloudLightning, description: "Heavy Thunderstorm with Hail" },
  };

  return weatherMap[code] ?? { IconComponent: CloudSun, description: "Unknown" };
};