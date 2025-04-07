import { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import PageHeading from "../../Components/PageHeading";
import useToast from "../../utils/useToast";
import "react-toastify/dist/ReactToastify.css";
import { Eye, PlusCircle } from "lucide-react";

const Index = ({ orders }) => {
    const { flash } = usePage().props;
    const [filter, setFilter] = useState("all"); // all, pending, processing, completed, cancelled
    const toast = useToast();

    // Handle flash messages
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

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
                return "badge-warning";
            case "processing":
                return "badge-info";
            case "completed":
                return "badge-success";
            case "cancelled":
                return "badge-error";
            default:
                return "badge-ghost";
        }
    };

    // Filter orders based on status
    const filteredOrders =
        filter === "all"
            ? orders.data
            : orders.data.filter((order) => order.status === filter);

    return (
        <>
            <Head title="Orders" />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <PageHeading title="Orders" />
                    <Link href="/orders/create" className="btn btn-primary">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create New Order
                    </Link>
                </div>

                {/* Status filter */}
                <div className="tabs tabs-border">
                    <a
                        className={`tab ${
                            filter === "all" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("all")}
                    >
                        All Orders
                    </a>
                    <a
                        className={`tab ${
                            filter === "pending" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </a>
                    <a
                        className={`tab ${
                            filter === "processing" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("processing")}
                    >
                        Processing
                    </a>
                    <a
                        className={`tab ${
                            filter === "completed" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </a>
                    <a
                        className={`tab ${
                            filter === "cancelled" ? "tab-active" : ""
                        }`}
                        onClick={() => setFilter("cancelled")}
                    >
                        Cancelled
                    </a>
                </div>

                {/* Orders table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.customer_name}</td>
                                        <td>{order.items.length} items</td>
                                        <td className="font-medium">
                                            {formatPrice(order.total_amount)}
                                        </td>
                                        <td>
                                            <div
                                                className={`badge ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    order.status.slice(1)}
                                            </div>
                                        </td>
                                        <td>{formatDate(order.created_at)}</td>
                                        <td>
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="btn btn-sm btn-info text-white"
                                            >
                                                <Eye
                                                    size={16}
                                                    className="mr-1"
                                                />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-4"
                                    >
                                        No orders found for the selected filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {orders.links && orders.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <div className="btn-group">
                            {orders.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`btn btn-sm ${
                                        link.active ? "btn-active" : ""
                                    } ${!link.url ? "btn-disabled" : ""}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

Index.layout = (page) => (
    <AuthLayout children={page} title="Orders | Kafee Siyap" />
);

export default Index;
