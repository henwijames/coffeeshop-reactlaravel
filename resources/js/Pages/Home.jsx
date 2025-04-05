import { Head, Link } from "@inertiajs/react";
import GuestLayout from "../Layouts/GuestLayout";
import { useEffect } from "react";

const Home = () => {
    return (
        <>
            <Head title="Kafee Siyap" />
            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
                Data to enrich your online business
            </h1>
            <p className="mt-8 text-lg font-medium  sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    href="/login"
                    className="btn btn-primary rounded-md px-4 py-2 text-sm font-semibold text-white"
                >
                    Get started
                </Link>
            </div>
        </>
    );
};

Home.layout = (page) => <GuestLayout children={page} title="Kaffee Siyap" />;
export default Home;
