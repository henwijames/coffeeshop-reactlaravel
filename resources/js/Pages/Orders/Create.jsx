import { useState, useEffect, useRef } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import PageHeading from "../../Components/PageHeading";
import useToast from "../../utils/useToast";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";

const EmptyState = () => (
    <div className="text-center py-12">
        <div className="flex flex-col items-center justify-center">
            <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
                No products available
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                There are no available products in this category to add to your
                order.
            </p>
        </div>
    </div>
);

const Create = ({ categories, products }) => {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState("all");
    const [cart, setCart] = useState([]);
    const [notes, setNotes] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const previousFlashRef = useRef(flash);
    const toast = useToast();

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

    const formatPrice = (price) => {
        return new Intl.NumberFormat("fil-PH", {
            style: "currency",
            currency: "PHP",
        }).format(price);
    };

    const addToCart = (product, size = null) => {
        const itemPrice = size
            ? parseFloat(product.price) + parseFloat(size.price_modifier)
            : parseFloat(product.price);

        // Check if item already in cart
        const existingItemIndex = cart.findIndex(
            (item) =>
                item.product.id === product.id &&
                ((!item.size && !size) ||
                    (item.size && size && item.size.id === size.id))
        );

        if (existingItemIndex >= 0) {
            // Update quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            // Add new item
            setCart([
                ...cart,
                {
                    product,
                    size,
                    quantity: 1,
                    price: itemPrice,
                    notes: "",
                },
            ]);
        }

        toast.success(`Added ${product.name} to cart`);
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
    };

    const updateItemNotes = (index, notes) => {
        const updatedCart = [...cart];
        updatedCart[index].notes = notes;
        setCart(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    const calculateSubtotal = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const handleSubmitOrder = () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!customerName) {
            toast.error("Please enter customer name");
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            customer_name: customerName,
            items: cart.map((item) => ({
                product_id: item.product.id,
                size_id: item.size ? item.size.id : null,
                quantity: item.quantity,
                notes: item.notes,
            })),
            notes: notes,
        };

        // Log data being sent
        console.log("Sending order data:", orderData);
        console.log("Posting to URL:", "/orders");

        router.post("/orders", orderData, {
            onSuccess: () => {
                setCart([]);
                setNotes("");
                setCustomerName("");
                setIsSubmitting(false);
            },
            onError: (errors) => {
                console.error("Order submission error:", errors);
                setIsSubmitting(false);
                toast.error(
                    "Failed to place order: " +
                        (errors.message || "Unknown error")
                );
            },
        });
    };

    // Product item component
    const ProductItem = ({ product }) => (
        <div className="card shadow-xl bg-base-100">
            <figure className="px-4 pt-4">
                <img
                    src={
                        product.image
                            ? `/storage/${product.image}`
                            : "/images/placeholder.png"
                    }
                    alt={product.name}
                    className="rounded-xl h-36 w-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-2">
                    <span className="text-primary font-semibold">
                        {formatPrice(product.price)}
                    </span>

                    {product.sizes && product.sizes.length > 0 ? (
                        <div className="mt-2 space-y-2">
                            <span className="text-xs text-gray-500">
                                Select size:
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        className="btn btn-xs btn-outline"
                                        onClick={() => addToCart(product, size)}
                                    >
                                        {size.name} (+
                                        {formatPrice(size.price_modifier)})
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="card-actions justify-end mt-2">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => addToCart(product)}
                            >
                                Add to Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Create Order" />
            <div className="flex flex-col lg:flex-row gap-6 ">
                {/* Left side - Products */}
                <div className="lg:w-3/5 space-y-6">
                    <PageHeading title="Place Order" />

                    {/* Tab Navigation */}
                    <div role="tablist" className="tabs tabs-border">
                        <a
                            role="tab"
                            className={`tab ${
                                activeTab === "all" ? "tab-active" : ""
                            }`}
                            onClick={() => setActiveTab("all")}
                        >
                            All Products
                        </a>
                        {categories.map((category) => (
                            <a
                                key={category.id}
                                role="tab"
                                className={`tab ${
                                    activeTab === category.id.toString()
                                        ? "tab-active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setActiveTab(category.id.toString())
                                }
                            >
                                {category.name}
                            </a>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className=" rounded-box p-4">
                        {activeTab === "all" ? (
                            Object.values(products).flat().length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {Object.values(products)
                                        .flat()
                                        .map((product) => (
                                            <ProductItem
                                                key={product.id}
                                                product={product}
                                            />
                                        ))}
                                </div>
                            ) : (
                                <EmptyState />
                            )
                        ) : (
                            categories
                                .filter(
                                    (category) =>
                                        category.id.toString() === activeTab
                                )
                                .map((category) => (
                                    <div key={category.id}>
                                        {products[category.name]?.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                                {products[category.name].map(
                                                    (product) => (
                                                        <ProductItem
                                                            key={product.id}
                                                            product={product}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <EmptyState />
                                        )}
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                {/* Right side - Order Cart */}
                <div className="lg:w-2/5">
                    <div className="bg-base-100 rounded-box p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4">
                            Order Summary
                        </h2>

                        {/* Customer Name Input */}
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="customerName"
                            >
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                className="input input-bordered w-full"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                placeholder="Enter customer name"
                            />
                        </div>

                        {/* Cart Items */}
                        {cart.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Your order is empty
                            </div>
                        ) : (
                            <div className="divide-y">
                                {cart.map((item, index) => (
                                    <div key={index} className="py-3">
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="font-medium">
                                                    {item.product.name}
                                                    {item.size && (
                                                        <span className="ml-1 text-sm text-gray-500">
                                                            ({item.size.name})
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatPrice(item.price)} x{" "}
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div className="text-right font-medium">
                                                {formatPrice(
                                                    item.price * item.quantity
                                                )}
                                            </div>
                                        </div>

                                        {/* Item Notes */}
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Add notes (e.g. no sugar)"
                                                value={item.notes}
                                                onChange={(e) =>
                                                    updateItemNotes(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-ghost btn-circle"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            index,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    <MinusCircle size={16} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="btn btn-sm btn-ghost btn-circle"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            index,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    <PlusCircle size={16} />
                                                </button>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-ghost btn-circle text-error"
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Order Notes */}
                        {cart.length > 0 && (
                            <div className="mt-4">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="orderNotes"
                                >
                                    Order Notes
                                </label>
                                <textarea
                                    id="orderNotes"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Add notes for the entire order"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={2}
                                />
                            </div>
                        )}

                        {/* Order Total */}
                        {cart.length > 0 && (
                            <>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t font-bold">
                                    <span>Total:</span>
                                    <span>
                                        {formatPrice(calculateSubtotal())}
                                    </span>
                                </div>

                                <button
                                    className="btn btn-primary w-full mt-4"
                                    disabled={isSubmitting || cart.length === 0}
                                    onClick={handleSubmitOrder}
                                >
                                    {isSubmitting
                                        ? "Processing..."
                                        : "Place Order"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

Create.layout = (page) => (
    <AuthLayout children={page} title="Create Order | Kafee Siyap" />
);

export default Create;
