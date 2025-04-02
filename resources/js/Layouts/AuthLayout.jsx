import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Coffee,
    Users,
    DollarSign,
    ShoppingBag,
    Home,
    ChevronDown,
    Bell,
    Settings,
    User,
    LogOut,
    Menu,
    X,
    Calendar,
    TrendingUp,
    PieChart,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import SidebarHeader from "../Components/SidebarHeader";

const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
];

const orderData = [
    {
        id: 1,
        customer: "John Doe",
        product: "Cappuccino",
        total: "$4.50",
        status: "Completed",
    },
    {
        id: 2,
        customer: "Jane Smith",
        product: "Latte",
        total: "$5.00",
        status: "Pending",
    },
    {
        id: 3,
        customer: "Bob Johnson",
        product: "Espresso",
        total: "$3.50",
        status: "Processing",
    },
    {
        id: 4,
        customer: "Alice Brown",
        product: "Americano",
        total: "$4.00",
        status: "Completed",
    },
    {
        id: 5,
        customer: "Tom Wilson",
        product: "Macchiato",
        total: "$4.75",
        status: "Pending",
    },
    {
        id: 6,
        customer: "Tom Wilson",
        product: "Macchiato",
        total: "$4.75",
        status: "Pending",
    },
    {
        id: 7,
        customer: "Tom Wilson",
        product: "Macchiato",
        total: "$4.75",
        status: "Pending",
    },
    {
        id: 8,
        customer: "Tom Wilson",
        product: "Macchiato",
        total: "$4.75",
        status: "Pending",
    },
];

const StatsCard = ({ icon, title, value, trend, color }) => {
    const IconComponent = icon;
    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
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
