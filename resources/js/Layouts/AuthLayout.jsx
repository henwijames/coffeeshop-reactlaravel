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
import PageHeading from "../Components/PageHeading";

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
                <header className="bg-base-300 shadow ">
                    <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        <button
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            onClick={openSidebar}
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center space-x-4 ml-auto">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                <Bell size={20} />
                            </button>

                            <div className="relative">
                                <button
                                    className="flex items-center space-x-2 focus:outline-none"
                                    onClick={() =>
                                        setUserMenuOpen(!userMenuOpen)
                                    }
                                >
                                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <User
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </div>
                                    <span className="text-sm font-medium hidden md:block">
                                        Admin User
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-500"
                                    />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-base-200 rounded-md shadow-lg py-1 z-10">
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </Link>
                                        <form method="POST" action="/logout">
                                            <button
                                                type="submit"
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
