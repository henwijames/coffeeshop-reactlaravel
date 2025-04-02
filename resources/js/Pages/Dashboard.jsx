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
import StatsCard from "../Components/StatsCard";

const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "July", sales: 390 },
    { name: "August", sales: 2390 },
    { name: "September", sales: 230 },
    { name: "October", sales: 290 },
    { name: "November", sales: 2390 },
    { name: "December", sales: 2090 },
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
                />
                <StatsCard
                    icon={ShoppingBag}
                    title="Orders"
                    value="452"
                    trend={5.2}
                />
                <StatsCard
                    icon={Users}
                    title="Customers"
                    value="1,257"
                    trend={8.1}
                />
                <StatsCard
                    icon={Coffee}
                    title="Products"
                    value="45"
                    trend={-2.3}
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
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend formatter={() => "Sales"} />
                                <Bar dataKey="sales" fill="#DB924C" />
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
