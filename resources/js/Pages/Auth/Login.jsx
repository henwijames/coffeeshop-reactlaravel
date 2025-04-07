import { Head, Link, router } from "@inertiajs/react";
import Logo from "@public/logo.webp";
import BackgroundOverlay from "../../Components/BackgroundOverlay";
import Input from "../../Components/Input";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        setFormData((formData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post("/login", formData, {
            onError: (err) => setErrors(err),
        });
    };
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <Head title="Login" />
            <BackgroundOverlay />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-x-4"
                >
                    <img
                        alt="Your Company"
                        src={Logo}
                        className="h-10 w-auto"
                    />
                    <h1 className="font-bold text-2xl">Kaffee Siyap</h1>
                </Link>
                <h2 className=" text-center text-2xl/9 font-bold tracking-tight ">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="johndoe@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            minLength="8"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Log in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 ">
                    Already registered?{" "}
                    <Link href="/signup" className="font-semibold text-primary">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
}
