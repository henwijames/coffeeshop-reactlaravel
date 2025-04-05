import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import GuestLayout from "./Layouts/GuestLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            console.error(
                `Page ${name} not found. Available pages:`,
                Object.keys(pages)
            );
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        // The color of the progress bar...
        color: "#634832",
    },
});
