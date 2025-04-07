import React, { useEffect, useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import Sidebar from "../Components/Sidebar";
import SidebarHeader from "../Components/SidebarHeader";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({ children, title }) {
    const { appSettings } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    // Set page title with site name
    const pageTitle = title || "Dashboard";
    const siteName = appSettings?.site_name || "Kaffee Siyap";
    const fullTitle = `${pageTitle} | ${siteName}`;

    return (
        <>
            <Head title={fullTitle} />
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={closeSidebar}
                    siteName={siteName}
                />

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {/* Top Navigation */}
                    <SidebarHeader openSidebar={openSidebar} />

                    {/* Dashboard Content */}
                    <main className="p-6">{children}</main>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
