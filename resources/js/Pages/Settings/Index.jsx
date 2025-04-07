import React, { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "../../Layouts/AuthLayout";
import PageHeading from "../../Components/PageHeading";
import { Shield, User, Globe, Palette, Save } from "lucide-react";
import { applyTheme, applyPrimaryColor } from "../../utils/themeUtils";
import useToast from "../../utils/useToast";

export default function Index({ currentRole, settings, availableThemes }) {
    const { flash } = usePage().props;
    const toast = useToast();
    const [formData, setFormData] = useState({
        site_name: settings?.site_name || "Kaffee Siyap",
        site_theme: settings?.site_theme || "corporate",
        primary_color: settings?.primary_color || "#DB924C",
    });
    const [saving, setSaving] = useState(false);

    // Apply theme and color on initial load
    useEffect(() => {
        applyTheme(formData.site_theme);
        applyPrimaryColor(formData.primary_color);
    }, []);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleToggleRole = () => {
        router.post("/settings/toggle-role");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Apply color change immediately
        if (name === "primary_color") {
            localStorage.setItem("primaryColor", value);
            applyPrimaryColor(value);
        }
    };

    const handleThemeChange = (themeId) => {
        setFormData((prev) => ({
            ...prev,
            site_theme: themeId,
        }));

        // Save to localStorage for immediate application on page refresh
        localStorage.setItem("theme", themeId);

        // Apply theme change immediately
        applyTheme(themeId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        router.post("/settings/site", formData, {
            onSuccess: () => {
                setSaving(false);
                // Clear localStorage as settings are now saved in database
                localStorage.removeItem("theme");
                localStorage.removeItem("primaryColor");
            },
            onError: () => {
                setSaving(false);
                toast.error("Failed to save settings. Please try again.");
            },
        });
    };

    return (
        <>
            <Head title="Settings" />
            <div className="space-y-6">
                <PageHeading
                    title="Settings"
                    description="Manage your account settings and application preferences"
                />

                <div className="grid grid-cols-1 gap-6">
                    {/* Site Settings Section */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                Site Settings
                            </h2>

                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Website Name */}
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">
                                                Website Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="site_name"
                                            value={formData.site_name}
                                            onChange={handleChange}
                                            className="input input-bordered w-full"
                                            placeholder="Enter website name"
                                            required
                                        />
                                        <label className="label">
                                            <span className="label-text-alt">
                                                This name will appear in the
                                                browser tab and sidebar
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Theme Selection */}
                                <div className="mt-6">
                                    <label className="label">
                                        <span className="label-text font-medium">
                                            Application Theme
                                        </span>
                                    </label>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                        {availableThemes?.map((theme) => (
                                            <div
                                                key={theme.id}
                                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                    formData.site_theme ===
                                                    theme.id
                                                        ? "border-primary bg-base-200"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() =>
                                                    handleThemeChange(theme.id)
                                                }
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium">
                                                        {theme.name}
                                                    </h3>
                                                    <div
                                                        className={`w-4 h-4 rounded-full ${
                                                            formData.site_theme ===
                                                            theme.id
                                                                ? "bg-primary"
                                                                : "bg-gray-200"
                                                        }`}
                                                    ></div>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {theme.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className={`btn btn-primary ${
                                            saving ? "loading" : ""
                                        }`}
                                        disabled={saving}
                                    >
                                        {!saving && (
                                            <Save className="w-4 h-4 mr-2" />
                                        )}
                                        Save Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title="Settings | Kafee Siyap" />
);
