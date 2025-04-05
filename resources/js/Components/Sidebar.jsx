"use client";

import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Coffee,
    Home,
    Users,
    ShoppingBag,
    TrendingUp,
    Settings,
    X,
    ChartBarStacked,
    ChevronDown,
    ChevronRight,
    PlusCircle,
    List,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
    const { url } = usePage();
    const [expandedMenus, setExpandedMenus] = useState({
        products: false,
    });

    const toggleMenu = (menu) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const navLinks = [
        { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
        {
            id: 2,
            name: "Categories",
            href: "/categories",
            icon: ChartBarStacked,
        },
        {
            id: 3,
            name: "Products",
            href: "/products",
            icon: Coffee,
            hasSubmenu: true,
            submenu: [
                { id: 31, name: "All Products", href: "/products", icon: List },
                {
                    id: 32,
                    name: "Add Product",
                    href: "/products/create",
                    icon: PlusCircle,
                },
            ],
        },
        { id: 4, name: "Customers", href: "/customers", icon: Users },
        { id: 5, name: "Orders", href: "/orders", icon: ShoppingBag },
        { id: 6, name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary transition-transform text-white duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Coffee className="h-8 w-8" />
                        <span className="text-lg font-semibold">
                            Coffee Shop
                        </span>
                    </div>
                    <button
                        className="p-2 rounded-md hover:bg-base-100 focus:outline-none transition-colors duration-300 lg:hidden"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="mt-5 px-2">
                    <div className="space-y-1">
                        {navLinks.map((item) => (
                            <React.Fragment key={item.id}>
                                {item.hasSubmenu ? (
                                    <div className="space-y-1">
                                        <button
                                            onClick={() =>
                                                toggleMenu("products")
                                            }
                                            className={`flex items-center justify-between text-white w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                                                url.startsWith(item.href)
                                                    ? "bg-gray-900 text-white"
                                                    : "hover:bg-gray-700 hover:text-white"
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <item.icon className="mr-3 h-5 w-5" />
                                                {item.name}
                                            </div>
                                            <div
                                                className={`transform transition-transform duration-200 ${
                                                    expandedMenus.products
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </button>

                                        {/* Submenu with animation */}
                                        <div
                                            className={`transform overflow-hidden transition-all duration-200 ease-in-out ${
                                                expandedMenus.products
                                                    ? "max-h-40 opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="pl-4 space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.id}
                                                        href={subItem.href}
                                                        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                                                            url === subItem.href
                                                                ? "bg-gray-900 text-white"
                                                                : "hover:bg-gray-700 hover:text-white"
                                                        }`}
                                                        onClick={onClose}
                                                    >
                                                        <subItem.icon className="mr-3 h-5 w-5" />
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-4 py-2 rounded-md text-white transition-colors duration-200 ${
                                            url.startsWith(item.href)
                                                ? "bg-gray-900 text-white"
                                                : "hover:bg-gray-700 hover:text-white"
                                        }`}
                                        onClick={onClose}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
