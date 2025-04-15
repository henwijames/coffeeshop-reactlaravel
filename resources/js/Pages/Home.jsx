import { Head, Link } from "@inertiajs/react";
import GuestLayout from "../Layouts/GuestLayout";
import { useEffect } from "react";
import Logo from "@public/logo.webp";

const Home = () => {
    return (
        <>
            <Head title="Kafee Siyap" />
            <div className="flex flex-col gap-4 lg:items-start items-center">
                <h1 className="text-5xl font-semibold sm:text-7xl text-center lg:text-start">
                    Great Coffee For Some Joy
                </h1>
                <p className=" text-lg font-medium  sm:text-xl w-96 text-center lg:text-start">
                    There are people who can't start their day without having a
                    freshly brewed cup of coffee and we understand them.
                </p>
                <Link
                    href="/login"
                    className="btn btn-primary rounded-md px-4 py-2 text-sm font-semibold text-white"
                >
                    Get started
                </Link>
            </div>
            <div>
                <img src={Logo} alt="logo" className="lg:w-fit w-80" />
            </div>
        </>
    );
};

Home.layout = (page) => <GuestLayout children={page} title="Kaffee Siyap" />;
export default Home;
