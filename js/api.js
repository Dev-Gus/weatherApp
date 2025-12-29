import { formatTime } from './utils.js';

/**
 * Gets geographic coordinates (latitude, longitude) for a city name
 * Uses Open-Meteo Geocoding API to find location data
 * @param {string} city - City name to search for
 * @returns {Promise<{latitude: number, longitude: number, name: string}>} - Location coordinates and official name
 * @throws {Error} - If city not found or geocoding server is unreachable
 */
export const getCoordinates = async (city) => {
    if (!navigator.onLine) {
        throw new Error('No Internet Connection');
    }

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        const geoData = await response.json();
        const firstResult = geoData?.results?.[0] ?? null;
        if (!firstResult) {
            throw new Error('City not found');
        }

        const { latitude, longitude, name } = firstResult;
        return { latitude, longitude, name };
    } catch (error) {
        if (error.message.includes('Failed geocoding')) {
            throw new Error('Unable to connect to geocoding server');
        } else {
            throw error;
        }
    }
};



/**
 * Gets current weather data for a specific location
 * Uses Open-Meteo API to fetch weather data
 * @param {number} lat - Latitude of the location
 * @param {number} lon - Longitude of the location
 * @returns {Promise<{temperature: number, feelsLike: number, humidity: number, weatherCode: number, windSpeed: number, uvIndex: number, formattedTime: string}>} - Current weather data
 * @throws {Error} - If weather data is not found or API is unreachable
 */
export const getWeatherData = async (lat, lon) => {
    if (!navigator.onLine) {
        throw new Error('No Internet Connection');
    }

    try {
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,uv_index`);
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const weatherData = await weatherResponse.json();
        const currentWeather = weatherData?.current ?? {};

        const {
            temperature_2m: temperature,
            apparent_temperature: feelsLike,
            relative_humidity_2m: humidity,
            weather_code: weatherCode,
            wind_speed_10m: windSpeed,
            uv_index: uvIndex,
            time,
        } = currentWeather;

        const formattedTime = formatTime(time);
        return {
            temperature,
            feelsLike,
            humidity,
            weatherCode,
            windSpeed,
            uvIndex,
            formattedTime,
        }
    } catch (error) {
        throw error;
    }
}