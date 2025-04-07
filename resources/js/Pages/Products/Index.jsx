import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState, Fragment } from "react";
import PageHeading from "../../Components/PageHeading";
import AuthLayout from "../../Layouts/AuthLayout";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

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
                There are no products available in this category.
            </p>
        </div>
    </div>
);

const Index = ({ categories, products }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("fil-PH", {
            style: "currency",
            currency: "PHP",
        }).format(price);
    };

    // Track active tab
    const [activeTab, setActiveTab] = useState("all");

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <PageHeading title="All Products" />
                    <Link href="/products/create" className="btn btn-primary">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Add Product
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div role="tablist" className="tabs tabs-lift">
                    <input
                        type="radio"
                        name="product_tabs"
                        role="tab"
                        className="tab"
                        aria-label="All Products"
                        checked={activeTab === "all"}
                        onChange={() => setActiveTab("all")}
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 p-6"
                    >
                        {Object.values(products).flat().length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Object.values(products)
                                    .flat()
                                    .map((product) => (
                                        <div
                                            key={product.id}
                                            className="card bg-base-100 shadow-xl"
                                        >
                                            <figure className="px-4 pt-4">
                                                <img
                                                    src={
                                                        product.image
                                                            ? `/storage/${product.image}`
                                                            : "/images/placeholder.png"
                                                    }
                                                    alt={product.name}
                                                    className="rounded-xl h-48 w-full object-cover"
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    {product.name}
                                                </h2>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-primary font-semibold">
                                                        {formatPrice(
                                                            product.price
                                                        )}
                                                    </span>
                                                    <div className="badge badge-secondary">
                                                        {product.category?.name}
                                                    </div>
                                                </div>

                                                {/* Display available sizes */}
                                                {product.sizes &&
                                                    product.sizes.length >
                                                        0 && (
                                                        <div className="mt-2">
                                                            <span className="text-xs text-gray-500">
                                                                Available sizes:
                                                            </span>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {product.sizes.map(
                                                                    (size) => (
                                                                        <span
                                                                            key={
                                                                                size.id
                                                                            }
                                                                            className="badge badge-sm badge-outline"
                                                                        >
                                                                            {
                                                                                size.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                <div className="card-actions justify-end mt-4">
                                                    <Link
                                                        href={`/products/${product.id}/edit`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            new Swal({
                                                                title: "Are you sure?",
                                                                text: "Once deleted, you will not be able to recover this product!",
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor:
                                                                    "#0075BB",
                                                                confirmButtonText:
                                                                    "Yes, delete it!",
                                                            }).then(
                                                                (result) => {
                                                                    if (
                                                                        result.isConfirmed
                                                                    ) {
                                                                        router.delete(
                                                                            `/products/${product.id}`
                                                                        );
                                                                    }
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <EmptyState />
                        )}
                    </div>

                    {categories.map((category) => (
                        <Fragment key={category.id}>
                            <input
                                type="radio"
                                name="product_tabs"
                                role="tab"
                                className="tab"
                                aria-label={category.name}
                                checked={activeTab === category.id.toString()}
                                onChange={() =>
                                    setActiveTab(category.id.toString())
                                }
                            />
                            <div
                                role="tabpanel"
                                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                            >
                                {products[category.name]?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {products[category.name].map(
                                            (product) => (
                                                <div
                                                    key={product.id}
                                                    className="card bg-base-100 shadow-xl"
                                                >
                                                    <figure className="px-4 pt-4">
                                                        <img
                                                            src={
                                                                product.image
                                                                    ? `/storage/${product.image}`
                                                                    : "/images/placeholder.png"
                                                            }
                                                            alt={product.name}
                                                            className="rounded-xl h-48 w-full object-cover"
                                                        />
                                                    </figure>
                                                    <div className="card-body">
                                                        <h2 className="card-title">
                                                            {product.name}
                                                        </h2>
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {
                                                                product.description
                                                            }
                                                        </p>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <span className="text-primary font-semibold">
                                                                {formatPrice(
                                                                    product.price
                                                                )}
                                                            </span>
                                                            <div className="badge badge-secondary">
                                                                {category.name}
                                                            </div>
                                                        </div>

                                                        {/* Display available sizes */}
                                                        {product.sizes && (
                                                            <div className="mt-2">
                                                                <span className="text-xs text-gray-500">
                                                                    Available
                                                                    sizes:
                                                                </span>
                                                                <div className="flex flex-wrap gap-1 mt-1">
                                                                    {product.sizes.map(
                                                                        (
                                                                            size
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    size.id
                                                                                }
                                                                                className="badge badge-sm badge-outline"
                                                                            >
                                                                                {
                                                                                    size.name
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="card-actions justify-end mt-4">
                                                            <Link
                                                                href={`/products/${product.id}/edit`}
                                                                className="btn btn-primary btn-sm"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    new Swal({
                                                                        title: "Are you sure?",
                                                                        text: "Once deleted, you will not be able to recover this product!",
                                                                        icon: "warning",
                                                                        showCancelButton: true,
                                                                        confirmButtonColor:
                                                                            "#0075BB",
                                                                        confirmButtonText:
                                                                            "Yes, delete it!",
                                                                    }).then(
                                                                        (
                                                                            result
                                                                        ) => {
                                                                            if (
                                                                                result.isConfirmed
                                                                            ) {
                                                                                router.delete(
                                                                                    `/products/${product.id}`
                                                                                );
                                                                            }
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <EmptyState />
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

Index.layout = (page) => (
    <AuthLayout children={page} title="Products | Kafee Siyap" />
);

export default Index;
