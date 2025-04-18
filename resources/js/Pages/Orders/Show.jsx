import { useState, useEffect, useRef } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import PageHeading from "../../Components/PageHeading";
import useToast from "../../utils/useToast";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Truck, Check, X, Loader2 } from "lucide-react";

const Show = ({ order }) => {
    const { flash } = usePage().props;
    const previousFlashRef = useRef(flash);
    const [isUpdating, setIsUpdating] = useState(false);
    const toast = useToast();
    const printRef = useRef();

    // Handle flash messages
    useEffect(() => {
        if (
            flash.success &&
            flash.success !== previousFlashRef.current?.success
        ) {
            toast.success(flash.success);
        }

        if (flash.error && flash.error !== previousFlashRef.current?.error) {
            toast.error(flash.error);
        }

        previousFlashRef.current = flash;
    }, [flash]);

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const logoUrl = "/assets/images/logo.webp"; // Update this with your logo path
        const printWindow = window.open("", "_blank", "width=800,height=600");

        if (!printWindow) return;

        printWindow.document.write(`
        <html>
            <head>
                <title>Print Order #${order.id}</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        padding: 30px;
                        color: #333;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        width: 100px;
                        margin-bottom: 10px;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f4f4f4;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                    }
                    .no-print {
                        display: none !important;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <img src="${logoUrl}" alt="Store Logo" />
                    <h2>guud coffee</h2>
                    <div>Order Receipt</div>
                </div>

                ${printContents}

                <div class="footer">
                    Thank you for your order!<br />
                    Printed on ${new Date().toLocaleString("en-PH")}
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 500);
                    };
                </script>
            </body>
        </html>
    `);

        printWindow.document.close();
    };

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

    const getStatusIcon = (status) => {
        switch (status) {
            case "processing":
                return <Truck size={16} className="mr-1" />;
            case "completed":
                return <Check size={16} className="mr-1" />;
            case "cancelled":
                return <X size={16} className="mr-1" />;
            default:
                return null;
        }
    };

    const updateOrderStatus = (status) => {
        setIsUpdating(true);
        router.put(
            `/orders/${order.id}/status`,
            {
                status: status,
            },
            {
                onSuccess: () => {
                    setIsUpdating(false);
                },
                onError: () => {
                    setIsUpdating(false);
                    toast.error("Failed to update order status");
                },
            }
        );
    };

    return (
        <>
            <Head title={`Order #${order.id}`} />
            <div className="space-y-6">
                <Link href="/orders" className="btn btn-ghost">
                    <ArrowLeft size={16} />
                    <span className="ml-1">Back to Orders</span>
                </Link>
                <div className="flex  justify-start gap-4">
                    <PageHeading title={`Order #${order.id}`} />
                    <button
                        className="btn btn-outline btn-primary"
                        onClick={handlePrint}
                    >
                        Print
                    </button>
                </div>
                <div ref={printRef}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title text-lg">
                                        Order Info
                                    </h3>

                                    <div className="mt-4 space-y-3">
                                        <div className="no-print">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    Status:
                                                </span>
                                                <div
                                                    className={`badge ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {getStatusIcon(
                                                        order.status
                                                    )}
                                                    {order.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        order.status.slice(1)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Customer:{" "}
                                            </span>
                                            <span className="font-medium">
                                                {order.customer_name}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Date:{" "}
                                            </span>
                                            <span>
                                                {formatDate(order.created_at)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Total:{" "}
                                            </span>
                                            <span className="font-medium">
                                                {formatPrice(
                                                    order.total_amount
                                                )}
                                            </span>
                                        </div>

                                        {order.notes && (
                                            <div>
                                                <span className="text-gray-500">
                                                    Notes:{" "}
                                                </span>
                                                <p className="mt-1 text-sm bg-gray-100 p-2 rounded">
                                                    {order.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="no-print">
                                        <div className="divider">
                                            Update Status
                                        </div>

                                        {isUpdating ? (
                                            <div className="flex items-center justify-center">
                                                <span className="loading loading-spinner text-neutral"></span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    className={`btn btn-sm btn-warning ${
                                                        order.status ===
                                                        "pending"
                                                            ? "btn-disabled"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            "pending"
                                                        )
                                                    }
                                                    disabled={
                                                        order.status ===
                                                        "pending"
                                                    }
                                                >
                                                    Pending
                                                </button>
                                                <button
                                                    className={`btn btn-sm btn-info ${
                                                        order.status ===
                                                        "processing"
                                                            ? "btn-disabled"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            "processing"
                                                        )
                                                    }
                                                    disabled={
                                                        order.status ===
                                                        "processing"
                                                    }
                                                >
                                                    Processing
                                                </button>
                                                <button
                                                    className={`btn btn-sm btn-success ${
                                                        order.status ===
                                                        "completed"
                                                            ? "btn-disabled"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            "completed"
                                                        )
                                                    }
                                                    disabled={
                                                        order.status ===
                                                        "completed"
                                                    }
                                                >
                                                    Completed
                                                </button>
                                                <button
                                                    className={`btn btn-sm btn-error ${
                                                        order.status ===
                                                        "cancelled"
                                                            ? "btn-disabled"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            "cancelled"
                                                        )
                                                    }
                                                    disabled={
                                                        order.status ===
                                                        "cancelled"
                                                    }
                                                >
                                                    Cancelled
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="lg:col-span-2">
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="card-title text-lg">
                                        Order Items
                                    </h3>

                                    <div className="overflow-x-auto mt-4">
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Size</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="font-medium">
                                                            {item.product
                                                                ?.name ||
                                                                "Unknown Product"}
                                                            {item.notes && (
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Note:{" "}
                                                                    {item.notes}
                                                                </p>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.size
                                                                ? item.size.name
                                                                : "Regular"}
                                                        </td>
                                                        <td>
                                                            {item.quantity}x
                                                        </td>
                                                        <td>
                                                            {formatPrice(
                                                                item.price
                                                            )}
                                                        </td>
                                                        <td className="font-medium">
                                                            {formatPrice(
                                                                item.price *
                                                                    item.quantity
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="text-right font-bold"
                                                    >
                                                        Total:
                                                    </td>
                                                    <td className="font-bold">
                                                        {formatPrice(
                                                            order.total_amount
                                                        )}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Show.layout = (page) => (
    <AuthLayout children={page} title="Order Details | Kafee Siyap" />
);

export default Show;
