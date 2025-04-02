"use client";

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Coffee,
    Home,
    Users,
    ShoppingBag,
    TrendingUp,
    Settings,
    X,
    Icon,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
    const { url } = usePage();
    const navLinks = [
        { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
        { id: 2, name: "Products", href: "/products", icon: Coffee },
        { id: 3, name: "Customers", href: "/customers", icon: Users },
        { id: 4, name: "Orders", href: "/orders", icon: ShoppingBag },
        { id: 5, name: "Settings", href: "/settings", icon: Settings },
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
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-secondary transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
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
                    <button className="lg:hidden" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <nav className="mt-5 px-2">
                    <div className="space-y-1">
                        {navLinks.map(({ id, name, href, icon: Icon }) => (
                            <Link
                                key={id}
                                href={href}
                                className={`flex items-center px-4 py-2 rounded-md ${
                                    url.startsWith(href)
                                        ? "bg-gray-900 text-white"
                                        : "hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
