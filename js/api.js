import { formatTime } from './utils.js';

const getCoordinates = async (city) => {
    if (!navigator.onLine) {
        throw new Error('No Internet Connection');
    }

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        const data = await response.json();
        console.log(data)
    } catch (error) {
        if (error.message.includes('Failed geocoding')) {
            throw new Error('Unable to connect to geocoding server');
        } else {
            throw error;
        }
    }
}