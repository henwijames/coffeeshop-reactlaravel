import React from "react";
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
import { Coffee, Users, DollarSign, ShoppingBag, Calendar } from "lucide-react";
import PageHeading from "../Components/PageHeading";
import AuthLayout from "../Layouts/AuthLayout";

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
    // ... rest of order data
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

export default function Dashboard() {
    return (
        <>
            <PageHeading
                title="Dashboard"
                description="Welcome back to your coffee shop dashboard"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    icon={DollarSign}
                    title="Total Revenue"
                    value="$24,567"
                    trend={12.5}
                    color="bg-primary"
                />
                <StatsCard
                    icon={ShoppingBag}
                    title="Orders"
                    value="452"
                    trend={5.2}
                    color="bg-blue-500"
                />
                <StatsCard
                    icon={Users}
                    title="Customers"
                    value="1,257"
                    trend={8.1}
                    color="bg-purple-500"
                />
                <StatsCard
                    icon={Coffee}
                    title="Products"
                    value="45"
                    trend={-2.3}
                    color="bg-amber-500"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-base-200 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Sales Overview
                    </h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={salesData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders table section */}
                <div className="bg-base-200 p-6 rounded-lg shadow-md">
                    {/* ... order table content ... */}
                </div>
            </div>

            {/* Bottom Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ... bottom widgets content ... */}
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <AuthLayout children={page} title="Dashboard | Kaffee Siyap" />
);
