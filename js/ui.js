const cityInput = document.getElementById('city-input');
const statusText = document.getElementById('status');
const weatherContainer = document.getElementById('weather-container');
const getWeatherBtn = document.getElementById('get-weather-btn');
const retryBtn = document.getElementById('retry-btn');
const weatherWarning = document.getElementById('weather-warning');

const cityNameEl = document.getElementById('city-name');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const timeEl = document.getElementById('time');
const feelsLikeEl = document.getElementById('feels-like');
const uvIndexEl = document.getElementById('uv-index');
const weatherIcon = document.getElementById('weather-icon');
const statusArea = document.getElementById('status-area');

let lastAttemptedCity = '';

const ui = {
    getCityInput: () => cityInput?.value.trim(),
    setLastAttemptedCity: (city) => lastAttemptedCity = city,
    getLastAttemptedCity: () => lastAttemptedCity,
    setStatus: ({ type, message }) => {
        if (!statusText) return;
        statusText.classList.remove('success', 'error', 'loading');
        statusText.innerHTML = "";

        if (type === 'loading') {
            statusArea.classList.add('loading');
            statusText.textContent = '';
            statusText.classList.add('visible');
            retryBtn.classList.add('hidden');
            ui.hideWeatherContainer();
            return;
        } else if (type === 'success') {
            statusArea.classList.remove('loading');
            statusText.innerHTML = '';
            statusText.classList.remove('loading', 'visible');
            retryBtn.classList.add('hidden');
            return;
        } else if (type === 'error') {
            statusArea.classList.remove('loading');
            statusText.textContent = message;
            statusText.classList.add('error', 'visible');
            retryBtn.classList.remove('hidden');
            ui.hideWeatherContainer();
            return;
        } else {
            console.error('Invalid status type:', type);
            return;
        }
    },
    updateWeather: (name, weather) => {
        const { temperature, condition, humidity, windSpeed, time, feelsLike, uvIndex } = weather;

        if (cityNameEl) cityNameEl.textContent = name;
        if (temperatureEl) temperatureEl.textContent = temperature.toFixed(1);
        if (humidityEl) humidityEl.textContent = humidity;
        if (timeEl) timeEl.textContent = time;
        if (windSpeedEl) windSpeedEl.textContent = windSpeed.toFixed(1);
        if (feelsLikeEl) feelsLikeEl.textContent = feelsLike.toFixed(1);
        if (uvIndexEl) uvIndexEl.textContent = uvIndex.toFixed(1);

        if (weatherContainer) ui.showWeatherContainer();
    },
    showWeatherContainer: () => {
        if (weatherContainer) weatherContainer.classList.add('visible');
    },
    hideWeatherContainer: () => {
        if (weatherContainer) weatherContainer.classList.remove('visible');
    },
    updateWeatherIcon: (icon, description) => {
        if (weatherIcon) weatherIcon.textContent = icon;
        if (conditionEl) conditionEl.textContent = description;
    },
    showPrecipitationWarning: (hasWarning, message = '') => {
        if (weatherWarning) {
            if (hasWarning) {
                weatherWarning.textContent = message;
                weatherWarning.classList.remove('hidden');
            } else {
                weatherWarning.classList.add('hidden');
            }
        }
    },
    clearInput: () => {
        if (cityInput) cityInput.value = '';
    },
    disableBtn: () => {
        if (getWeatherBtn) getWeatherBtn.disabled = true;
    },
    enableBtn: () => {
        if (getWeatherBtn) getWeatherBtn.disabled = false;
    },
    clearStatus: () => {
        if (!statusText) return;
        statusText.textContent = '';
        statusText.classList.remove('loading', 'success', 'error', 'visible');
    },
}

export default ui;