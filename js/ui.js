export const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const retryBtn = document.getElementById('retry-btn');

const weatherContainer = document.getElementById('weather-container');
const statusArea = document.getElementById('status-area');
const statusText = document.getElementById('status');
const cityNameEl = document.getElementById('city-name');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windspeed');
const timeEl = document.getElementById('time');
const feelsLikeEl = document.getElementById('feels-like');
const uvIndexEl = document.getElementById('uv-index');
const weatherIcon = document.getElementById('weather-icon');
const weatherWarning = document.getElementById('weather-warning');

let lastAttemptedCity = '';

/**
 * UI Controller object for managing DOM updates
 */
const ui = {
    /**
     * Get current value from city input
     * @returns {string} - Trimmed city name
     */
    getCityInput: () => cityInput?.value.trim(),
    /**
     * Store last attempted city name
     * @param {string} city - City name
     */
    setLastAttemptedCity: (city) => lastAttemptedCity = city,
    /**
     * Get last attempted city name
     * @returns {string} - Last city name
     */
    getLastAttemptedCity: () => lastAttemptedCity,
    /**
     * Set status message and state
     * @param {Object} status - Status object
     * @param {'loading'|'success'|'error'} status.type - Status type
     * @param {string} [status.message] - Error message (required for 'error' type)
     */
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
    /**
     * Update weather display with new data
     * @param {string} name - City name
     * @param {Object} weather - Weather data object
     */
    updateWeather: (name, weather) => {
        const { temperature, humidity, windSpeed, time, feelsLike, uvIndex } = weather;

        if (cityNameEl) cityNameEl.textContent = name;
        if (temperatureEl) temperatureEl.textContent = temperature.toFixed(1);
        if (humidityEl) humidityEl.textContent = humidity;
        if (timeEl) timeEl.textContent = time;
        if (windSpeedEl) windSpeedEl.textContent = windSpeed.toFixed(1);
        if (feelsLikeEl) feelsLikeEl.textContent = feelsLike.toFixed(1);
        if (uvIndexEl) uvIndexEl.textContent = uvIndex.toFixed(1);

        if (weatherContainer) ui.showWeatherContainer();
    },
    /**
     * Show weather container
     */
    showWeatherContainer: () => {
        if (weatherContainer) weatherContainer.classList.add('visible');
    },
    /**
     * Hide weather container
     */
    hideWeatherContainer: () => {
        if (weatherContainer) weatherContainer.classList.remove('visible');
    },
    /**
     * Update weather icon and description element
     * @param {string} icon - Emoji icon
     * @param {string} description - Weather description
     */
    updateWeatherIcon: (icon, description) => {
        if (weatherIcon) weatherIcon.textContent = icon;
        if (conditionEl) conditionEl.textContent = description;
    },
    /**
     * Show or hide precipitation warning
     * @param {boolean} hasWarning - Whether to show warning
     * @param {string} [message=''] - Warning message
     */
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
    /**
     * Clear city input field
     */
    clearInput: () => {
        if (cityInput) cityInput.value = '';
    },
    /**
     * Disable get weather button
     */
    disableBtn: () => {
        if (getWeatherBtn) getWeatherBtn.disabled = true;
    },
    /**
     * Enable get weather button
     */
    enableBtn: () => {
        if (getWeatherBtn) getWeatherBtn.disabled = false;
    },
    /**
     * Clear status message and states
     */
    clearStatus: () => {
        if (!statusText) return;
        statusText.textContent = '';
        statusText.classList.remove('loading', 'success', 'error', 'visible');
    },
}

export default ui;