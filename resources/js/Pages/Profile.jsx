import React, { useState, useEffect, useRef } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import PageHeading from "../Components/PageHeading";
import AuthLayout from "../Layouts/AuthLayout";
import Input from "../Components/Input";
import useToast from "../utils/useToast";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user }) => {
    const { data, setData, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        profile_image: null,
    });
    const { flash } = usePage().props;
    const previousFlashRef = useRef(flash);
    const [previewImage, setPreviewImage] = useState(
        user.profile_image || null
    );
    const toast = useToast();

    useEffect(() => {
        console.log("FLASH DATA:", flash); // Debug this!
        if (
            flash.success &&
            flash.success !== previousFlashRef.current?.success
        ) {
            toast.success(flash.success);
        } else if (
            flash.error &&
            flash.error !== previousFlashRef.current?.error
        ) {
            toast.error(flash.error);
        }
        previousFlashRef.current = flash;
    }, [flash]);

    // Update form data when user data changes, but preserve the preview image
    useEffect(() => {
        setData({
            name: user.name || "",
            email: user.email || "",
            profile_image: null,
        });
        // Only update preview image if we don't have a current preview
        if (!previewImage) {
            setPreviewImage(user.profile_image || null);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append("_method", "PUT"); // Add method spoofing
        formData.append("name", data.name);
        formData.append("email", data.email);

        // Only append profile_image if it's a File object
        if (data.profile_image instanceof File) {
            formData.append("profile_image", data.profile_image);
        }

        // Use post instead of put for file uploads
        router.post("/profile", formData, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Keep the current preview image
                setPreviewImage(previewImage);
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set the file directly in the form data
            setData("profile_image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Head title="Profile" />
            <PageHeading title="Profile" />
            <div className="grid gap-8 lg:grid-cols-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image Upload */}
                    <div className="flex items-center space-x-6">
                        <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <svg
                                    className="h-12 w-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="profile_image"
                                className="block text-sm font-medium"
                            >
                                Profile Image
                            </label>
                            <input
                                type="file"
                                id="profile_image"
                                name="profile_image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-primary/90"
                            />
                            {errors.profile_image && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.profile_image}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Name Field */}
                    <div>
                        <Input
                            label="Name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                            {processing ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

Profile.layout = (page) => (
    <AuthLayout children={page} title="Profile | Kaffee Siyap" />
);

export default Profile;
