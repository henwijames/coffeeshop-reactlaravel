import GuestLayout from "../Layouts/GuestLayout";

const Home = () => {
    return (
        <>
            <h1 className="text-5xl font-semibold tracking-tight  sm:text-7xl">
                Data to enrich your online business
            </h1>
            <p className="mt-8 text-lg font-medium  sm:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                    href="#"
                    className="rounded-md btn px-4 py-2 text-sm font-semibold text-white"
                >
                    Get started
                </a>
                <a href="#" className="text-sm font-semibold ">
                    Learn more <span aria-hidden="true">→</span>
                </a>
            </div>
        </>
    );
};

Home.layout = (page) => <GuestLayout children={page} title="Kaffee Siyap" />;
export default Home;
