import { useEffect, useRef, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Menu, Bell, User, ChevronDown } from "lucide-react";

const SidebarHeader = ({ openSidebar }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { auth } = usePage().props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        router.delete("/logout");
    };
    return (
        <>
            <Head title="Dashboard | Kafee Siyap" />
            <header className="bg-base-100 shadow ">
                <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <button
                        className="lg:hidden p-2 rounded-md hover:bg-base-100 focus:outline-none transition-colors duration-300"
                        onClick={openSidebar}
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="relative" ref={menuRef}>
                            <button
                                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <span className="text-xs font-medium bg-gray-700 text-white px-2 py-1 rounded capitalize">
                                    {auth?.user?.role || "guest"}
                                </span>
                                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    {auth.user?.profile_image ? (
                                        <img
                                            src={`/storage/${auth.user.profile_image}`}
                                            alt={auth.user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    )}
                                </div>
                                <span className="text-sm font-medium hidden md:block">
                                    {auth.user?.name || "Guest"}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className="text-gray-500"
                                />
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-base-200 rounded-md shadow-lg py-1 z-10">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm hover:text-primary transition-colors duration-300 cursor-pointer"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-sm hover:text-primary transition-colors duration-300 cursor-pointer"
                                    >
                                        Settings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-4 py-2 text-sm hover:text-primary transition-colors duration-300 cursor-pointer"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default SidebarHeader;
