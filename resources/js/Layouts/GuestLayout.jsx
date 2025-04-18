"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import Logo from "@public/logo.webp";

export default function GuestLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="max-w-[1200px] mx-auto">
                <nav
                    aria-label="Global"
                    className="flex items-center justify-between p-2 lg:px-8"
                >
                    <div className="flex lg:flex-1">
                        <Link
                            href="/"
                            className="-m-1.5 p-1.5 flex items-center gap-2"
                        >
                            <img src={Logo} alt="logo" className="w-12" />
                            <span className=" text-black">Kaffee Siyap</span>
                        </Link>
                    </div>
                    <div className="flex  lg:justify-end">
                        <Link href="/login" className="text-sm font-semibold">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>

                <main className="relative  px-6  lg:px-8">
                    <div className="mx-auto max-w-[1200px] flex lg:flex-row flex-col-reverse justify-center items-center min-h-[80vh]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
