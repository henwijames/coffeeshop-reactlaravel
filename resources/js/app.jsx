import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { applyTheme, applyPrimaryColor } from "./utils/themeUtils";

// Apply theme on app load
function applyInitialTheme() {
    // First try to get theme from localStorage (for immediate theme preview)
    const storedTheme = localStorage.getItem("theme");
    const storedColor = localStorage.getItem("primaryColor");

    if (storedTheme) {
        applyTheme(storedTheme);
    }

    if (storedColor) {
        applyPrimaryColor(storedColor);
    }
}

// Apply theme immediately
applyInitialTheme();

const appName = import.meta.env.VITE_APP_NAME || "Kaffee Siyap";

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
