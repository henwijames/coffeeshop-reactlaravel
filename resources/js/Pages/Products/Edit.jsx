import { useState, useEffect, useRef } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";
import Input from "../../Components/Input";
import PageHeading from "../../Components/PageHeading";
import useToast from "../../utils/useToast";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS
import Swal from "sweetalert2";

const Edit = ({ categories, product, sizes }) => {
    const { flash } = usePage().props;
    const previousFlashRef = useRef(flash);
    const toast = useToast();

    const [values, setValues] = useState({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        category_id: product?.category_id || "",
        status: product?.is_available ?? true,
        image: null,
        sizes: {},
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        product?.image ? `/storage/${product.image}` : null
    );

    // Initialize sizes with product's existing sizes
    useEffect(() => {
        if (sizes && sizes.length > 0) {
            const sizesObj = {};
            sizes.forEach((size) => {
                // Check if product has this size
                const productSize = product.sizes.find(
                    (ps) => ps.id === size.id
                );

                sizesObj[size.id] = {
                    selected: !!productSize,
                    price: productSize ? productSize.pivot.price : null,
                };
            });
            setValues((v) => ({ ...v, sizes: sizesObj }));
        }
    }, [sizes, product.sizes]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Update Product",
            text: "Are you sure you want to update this product?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#0075BB",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setProcessing(true);

                const formData = new FormData();
                formData.append("_method", "PUT"); // For Laravel method spoofing
                formData.append("name", values.name);
                formData.append("description", values.description);
                formData.append("price", values.price);
                formData.append("category_id", values.category_id);
                formData.append("is_available", values.status ? 1 : 0);

                if (values.image instanceof File) {
                    formData.append("image", values.image);
                }

                // Process sizes data - make sure it's simplified since we removed custom prices
                const simplifiedSizes = {};
                Object.entries(values.sizes).forEach(([sizeId, sizeData]) => {
                    simplifiedSizes[sizeId] = {
                        selected: sizeData.selected,
                        price: null, // No custom price since we removed that section
                    };
                });

                // Append sizes data
                formData.append("sizes", JSON.stringify(simplifiedSizes));

                // Log what we're sending
                console.log("Form data being sent:", {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    category_id: values.category_id,
                    is_available: values.status,
                    sizes: simplifiedSizes,
                });

                router.post(`/products/${product.id}`, formData, {
                    forceFormData: true,
                    onSuccess: () => {
                        setProcessing(false);
                    },
                    onFinish: () => setProcessing(false),
                    onError: (errors) => {
                        console.error("Form validation errors:", errors);
                        setErrors(errors);
                        toast.error("Please fix the errors in the form.");
                    },
                });
            }
        });
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValues({
                ...values,
                image: file,
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSizeChange = (sizeId, field, value) => {
        setValues((prev) => ({
            ...prev,
            sizes: {
                ...prev.sizes,
                [sizeId]: {
                    ...prev.sizes[sizeId],
                    [field]: value,
                },
            },
        }));
    };

    return (
        <>
            <Head title="Edit Product" />
            <PageHeading title="Edit Product" />

            <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Image
                        </label>
                        <div className="flex flex-col justify-center gap-2 space-x-6">
                            <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        className="w-12 h-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input file-input-ghost file-input-primary file-input-xs"
                                />
                            </div>
                        </div>
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Name Field */}
                    <Input
                        label="Product Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />

                    {/* Description Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={values.description}
                            onChange={handleChange}
                            className="mt-1 block textarea"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Price Field */}
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={values.price}
                        onChange={handleChange}
                        error={errors.price}
                        required
                    />

                    {/* Category Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="category_id"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={values.category_id}
                            onChange={handleChange}
                            className="mt-1 block select"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    {/* Status Field */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="status"
                            name="status"
                            checked={values.status}
                            className="toggle"
                            onChange={handleChange}
                        />
                        <label htmlFor="status" className="text-sm font-medium">
                            Active
                        </label>
                    </div>

                    {/* Sizes Field */}
                    {sizes && sizes.length > 0 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Available Sizes
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {sizes.map((size) => (
                                    <div
                                        key={size.id}
                                        className="border rounded-lg p-4 bg-base-100"
                                    >
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                id={`size-${size.id}`}
                                                className="checkbox"
                                                checked={
                                                    values.sizes[size.id]
                                                        ?.selected || false
                                                }
                                                onChange={(e) =>
                                                    handleSizeChange(
                                                        size.id,
                                                        "selected",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`size-${size.id}`}
                                                className="ml-2 font-medium"
                                            >
                                                {size.name} (+₱
                                                {size.price_modifier})
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                            {processing ? "Updating..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

Edit.layout = (page) => (
    <AuthLayout children={page} title="Edit Product | Kaffee Siyap" />
);

export default Edit;
