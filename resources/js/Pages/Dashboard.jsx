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
import { Head, Link } from "@inertiajs/react";
import PageHeading from "../Components/PageHeading";
import AuthLayout from "../Layouts/AuthLayout";
import StatsCard from "../Components/StatsCard";

export default function Dashboard({ stats, salesData, recentOrders }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("fil-PH", {
            style: "currency",
            currency: "PHP",
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-PH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <PageHeading
                title="Dashboard"
                description="Welcome back to your coffee shop dashboard"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    icon={DollarSign}
                    title="Total Revenue"
                    value={formatPrice(stats.totalRevenue)}
                    trend={stats.revenueTrend}
                />
                <StatsCard
                    icon={ShoppingBag}
                    title="Orders"
                    value={stats.orderCount}
                    trend={stats.orderTrend}
                />
                <StatsCard
                    icon={Users}
                    title="Customers"
                    value={stats.customerCount}
                    trend={stats.customerTrend}
                />
                <StatsCard
                    icon={Coffee}
                    title="Products"
                    value={stats.productCount}
                    trend={stats.productTrend}
                />
            </div>
            {/* Additional information */}
            <div className="bg-base-200 p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        Coffee Shop Dashboard
                    </h2>
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>
                <p className="text-gray-600">
                    Welcome to your coffee shop management dashboard. Here you
                    can track sales, manage orders, and monitor your business
                    performance.
                </p>
                <div className="mt-4 flex gap-4">
                    <Link href="/orders/create" className="btn btn-primary">
                        New Order
                    </Link>
                    <Link href="/products" className="btn btn-outline">
                        Manage Products
                    </Link>
                </div>
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
                                <Tooltip
                                    formatter={(value) => formatPrice(value)}
                                />
                                <Legend formatter={() => "Monthly Sales"} />
                                <Bar dataKey="sales" fill="#DB924C" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders table */}
                <div className="bg-base-200 p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Recent Orders</h2>
                        <Link
                            href="/orders"
                            className="text-primary text-sm hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <Link
                                                    href={`/orders/${order.id}`}
                                                    className="font-medium hover:text-primary"
                                                >
                                                    #{order.id}
                                                </Link>
                                            </td>
                                            <td>{order.customer}</td>
                                            <td>{order.product}</td>
                                            <td>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="font-medium">
                                                {formatPrice(order.total)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4"
                                        >
                                            No recent orders
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <AuthLayout children={page} title="Dashboard | Kaffee Siyap" />
);
