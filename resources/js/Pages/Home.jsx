import GuestLayout from "../Layouts/GuestLayout";

export default function Home({ name }) {
    return (
        <>
            <h1 className="font-bold text-8xl">Hello {name} </h1>
            <p className="">Hello {name} </p>
        </>
    );
}
