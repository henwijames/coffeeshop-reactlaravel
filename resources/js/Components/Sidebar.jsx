"use client";

import React, { useState, useEffect } from "react";
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
    ListOrdered,
    ListOrderedIcon,
} from "lucide-react";
import useToast from "../utils/useToast";

const Sidebar = ({ isOpen, onClose, siteName = "Coffee Shop" }) => {
    const page = usePage();
    const pageProps = page.props || {};

    // Get current URL using window.location for reliability
    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

    // Get user role with good fallbacks
    let userRole = "cashier"; // Default role
    try {
        userRole = pageProps.auth?.user?.role || "cashier";
    } catch (e) {
        console.error("Error accessing user role:", e);
    }

    const toast = useToast();

    // Define all navigation items
    const allNavLinks = [
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
        {
            id: 5,
            name: "Orders",
            href: "/orders",
            icon: ListOrdered,
            hasSubmenu: true,
            submenu: [
                {
                    id: 33,
                    name: "All Orders",
                    href: "/orders",
                    icon: ListOrderedIcon,
                },
                {
                    id: 34,
                    name: "Order Product",
                    href: "/orders/create",
                    icon: PlusCircle,
                },
            ],
        },
        { id: 6, name: "Settings", href: "/settings", icon: Settings },
    ];

    // Define navigation links for cashiers (only Orders)
    const cashierNavLinks = [
        { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
        {
            id: 5,
            name: "Orders",
            href: "/orders",
            icon: ListOrdered,
            hasSubmenu: true,
            submenu: [
                {
                    id: 33,
                    name: "All Orders",
                    href: "/orders",
                    icon: ListOrderedIcon,
                },
                {
                    id: 34,
                    name: "Order Product",
                    href: "/orders/create",
                    icon: PlusCircle,
                },
            ],
        },
    ];
    const navLinks = userRole === "admin" ? allNavLinks : cashierNavLinks;
    const [expandedMenus, setExpandedMenus] = useState({});

    const isActivePath = (href) => {
        if (!currentPath) return false;
        return currentPath.startsWith(href);
    };

    // Update expanded menus when URL changes
    useEffect(() => {
        const updatedMenus = {};

        navLinks.forEach((item) => {
            if (item.hasSubmenu) {
                const menuKey = item.name.toLowerCase();
                let shouldExpand = false;

                if (currentPath === item.href) {
                    shouldExpand = true;
                }

                if (
                    item.submenu.some((subItem) =>
                        currentPath.startsWith(subItem.href)
                    )
                ) {
                    shouldExpand = true;
                }

                if (shouldExpand) {
                    updatedMenus[menuKey] = true;
                }
            }
        });

        const hasChanges = Object.keys(updatedMenus).some(
            (key) => updatedMenus[key] !== expandedMenus[key]
        );

        if (hasChanges) {
            setExpandedMenus((prev) => ({
                ...prev,
                ...updatedMenus,
            }));
        }
    }, [currentPath]);

    const toggleMenu = (menu) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

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
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary transition-transform text-neutral dark:text-white duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Coffee className="h-8 w-8" />
                        <span className="text-lg font-semibold">
                            {siteName}
                        </span>
                    </div>
                    <button
                        className="p-2 rounded-md hover:bg-base-100 focus:outline-none transition-colors duration-300 lg:hidden"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="mt-3 px-2">
                    <div className="space-y-1">
                        {navLinks.map((item) => (
                            <React.Fragment key={item.id}>
                                {item.hasSubmenu ? (
                                    <div className="space-y-1">
                                        <button
                                            onClick={() =>
                                                toggleMenu(
                                                    item.name.toLowerCase()
                                                )
                                            }
                                            className={`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                                                isActivePath(item.href)
                                                    ? "bg-accent text-white font-medium"
                                                    : "hover:bg-accent"
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <item.icon className="mr-3 h-5 w-5" />
                                                {item.name}
                                            </div>
                                            <div
                                                className={`transform transition-transform duration-200 ${
                                                    expandedMenus[
                                                        item.name.toLowerCase()
                                                    ]
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
                                                expandedMenus[
                                                    item.name.toLowerCase()
                                                ]
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
                                                            isActivePath(
                                                                subItem.href
                                                            )
                                                                ? "bg-accent font-medium"
                                                                : "hover:bg-accent"
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
                                        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                                            isActivePath(item.href)
                                                ? "bg-accent text-white font-medium"
                                                : "hover:bg-accent"
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
