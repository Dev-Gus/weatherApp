/**
 * Update toggle button icon and title based on theme
 * @param {string} theme - The theme to update the toggle button for (dark or light)
 */
const updateToggleBtn = (theme) => {
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('.toggle-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            toggleBtn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        }
    }
};

/**
 * Setup toggle button event listener
 */
const setupToggleBtn = () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
};

/**
 * Get current theme
 * @returns {string} - The current theme (dark or light)
 */
const getCurrentTheme = () => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
};

/**
 * Set theme
 * @param {string} theme - The theme to set (dark or light)
 */
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateToggleBtn('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateToggleBtn('light');
    }
};

/**
 * Initialize theme on page load
 * Checks localStorage or default to light theme
 */
export const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme);
    setupToggleBtn();
}