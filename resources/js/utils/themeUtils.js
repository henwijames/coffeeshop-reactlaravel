/**
 * Apply the selected theme to the document element
 * @param {string} theme - The theme to apply
 */
export const applyTheme = (theme) => {
    if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
    }
};

/**
 * Apply primary color as CSS variable
 * @param {string} color - The primary color hex code
 */
export const applyPrimaryColor = (color) => {
    if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--primary-color", color);
    }
};
