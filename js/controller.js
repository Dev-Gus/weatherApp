import ui from './ui.js';
import { cityInput } from './ui.js';
import { getCoordinates, getWeatherData } from './api.js';
import { getWeatherIcon, isPrecipitation } from './utils.js';

const getWeatherBtn = document.getElementById('get-weather-btn');
const retryBtn = document.getElementById('retry-btn');

const getErrorMsg = (error) => {
    const msg = error?.message || 'Something went wrong';

    const errorMap = {
        'No internet connection': 'Please check your internet connection and try again.',
        'City not found': 'City not found. Please check the spelling and try again.',
        'Unable to connect to geocoding server': 'Unable to reach location server. Please try again in a moment.',
        'Failed to fetch weather data': 'Failed to fetch weather data. Please try again in a moment.',
        'Input must be a city name': 'Please enter a valid city name',
        'Missing weather data': 'Missing weather data. Please try another city.'
    }

    return errorMap[msg] || msg;
};

const withTimeOut = (promise, timeoutMs = 10000) => {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out. Please check your connection and try again.')), timeoutMs);
    });

    return Promise.race([promise, timeout]);
};

const fetchWeather = async (city) => {
    try {
        if (!city) throw new Error('Input must be a city name');

        const MAX_CITY_LENGTH = 100;
        if (city.length >= MAX_CITY_LENGTH) throw new Error('City name is too long');

        const regex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
        if (!regex.test(city)) throw new Error('City can only contain letters, spaces, hyphens and apostrophes.');

        ui.setLastAttemptedCity(city);

        const { latitude, longitude, name } = await withTimeOut(getCoordinates(city));

        const weatherData = await withTimeOut(getWeatherData(latitude, longitude));

        return { name, latitude, longitude, weatherData };
    } catch (error) {
        throw error;
    }
};

const renderWeather = (data) => {
    if (!data || !data.weather) {
        ui.setStatus({ type: 'error', message: getErrorMsg(new Error('Missing weather data')) });
        return;
    }

    ui.updateWeather(data.name, data.weather);

    const { emoji, description } = getWeatherIcon(data.weather.weathercode);
    ui.updateWeatherIcon(emoji, description);

    if (isPrecipitation(data.weather.weathercode)) {
        ui.showPrecipitationWarning(true, 'It may rain or snow. Please take an umbrella or jacket.');
    } else {
        ui.showPrecipitationWarning(false);
    }

    ui.setStatus({ type: 'success' });
};

const handleWeatherRequest = async () => {
    const cityInput = ui.getCityInput();
    if (!cityInput) {
        ui.setStatus({ type: 'error', message: getErrorMsg(new Error('Input must be a city name')) });
        return;
    }

    ui.clearStatus();
    ui.disableBtn();
    ui.setStatus({ type: 'loading' });

    try {
        const cityWeather = await fetchWeather(cityInput);
        renderWeather(cityWeather);
        localStorage.setItem('lastCity', cityWeather.name);
        ui.clearInput();
    } catch (error) {
        ui.setStatus({ type: 'error', message: getErrorMsg(error) });
    } finally {
        ui.enableBtn();
    }
};


export const initApp = async () => {
    getWeatherBtn.addEventListener('click', () => handleWeatherRequest());
    retryBtn.addEventListener('click', () => {
        const currentInput = ui.getCityInput();
        const lastCity = ui.getLastAttemptedCity();

        if (currentInput && currentInput !== lastCity) {
            handleWeatherRequest();
        } else if (!currentInput && lastCity) {
            cityInput.value = lastCity;
            handleWeatherRequest()
        }
    });

    cityInput.addEventListener('input', () => ui.setLastAttemptedCity(''));

    cityInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleWeatherRequest();
        }
    });

    try {
        const lastCityStored = ui.getLastAttemptedCity();
        if (lastCityStored) {
            ui.disableBtn();
            ui.setStatus({ type: 'loading' });
            const cityWeather = await fetchWeather(lastCityStored);
            renderWeather(cityWeather);
        }
    } catch (error) {
        ui.setStatus({ type: 'error', message: getErrorMsg(error) });
    } finally {
        ui.enableBtn();
    }
};