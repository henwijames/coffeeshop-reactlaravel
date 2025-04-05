import { Head, Link, router } from "@inertiajs/react";
import Logo from "@public/logo.webp";
import BackgroundOverlay from "../../Components/BackgroundOverlay";
import Input from "../../Components/Input";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

        if (formData.password !== formData.password_confirmation) {
            setFormData((prevData) => ({
                ...prevData,
                password: "",
                password_confirmation: "",
            }));
            setErrors({
                ...errors,
                password_confirmation: "Password do not match",
            });
            return;
        }

        router.post("/signup", formData, {
            onError: (err) => setErrors(err),
        });
    };
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <Head title="Signup | Kafee Siyap" />
            <BackgroundOverlay />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src={Logo}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="text-center text-2xl/9 font-bold tracking-tight ">
                    Sign up an account
                </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="Toto Asukal"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                    </div>
                    <div>
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                    </div>

                    <div>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            minlength="8"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                    </div>
                    <div>
                        <Input
                            label="Confirm Password"
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            minlength="8"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            error={errors.password_confirmation}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 ">
                    Already registered?{" "}
                    <Link href="/login" className="font-semibold text-primary">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
