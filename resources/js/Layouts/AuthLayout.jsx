import React, { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar";
import SidebarHeader from "../Components/SidebarHeader";
import { ToastContainer, toast } from "react-toastify";

const StatsCard = ({ icon, title, value, trend, color }) => {
    const IconComponent = icon;
    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <ToastContainer /> {/* This is needed for showing toasts */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    <p
                        className={`text-sm mt-2 ${
                            trend > 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {trend > 0 ? "+" : ""}
                        {trend}% from last month
                    </p>
                </div>
                <div className={`p-3 rounded-full bg-primary text-white`}>
                    <IconComponent size={20} className="" />
                </div>
            </div>
        </div>
    );
};

export default function AuthLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Navigation */}
                <SidebarHeader openSidebar={openSidebar} />

                {/* Dashboard Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
