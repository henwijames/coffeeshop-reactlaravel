import { Link } from "@inertiajs/react";
import Logo from "@public/logo.webp";

const Layout = ({ children }) => {
    return (
        <div className="h-screen w-full px-5 py-3">
            <div className="absolute inset-0 -z-10 bg-[url(/assets/images/background.jpg)] bg-cover bg-center bg-no-repeat blur-sm"></div>
            <div className="max-w-[1200px] mx-auto">
                <header>
                    <nav className="flex justify-between ">
                        <div>
                            <Link href="/">
                                <img src={Logo} alt="logo" className="w-12" />
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/login"
                                className="btn btn-primary rounded-sm"
                            >
                                Login
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="flex justify-center min-h-[80vh] flex-col">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
