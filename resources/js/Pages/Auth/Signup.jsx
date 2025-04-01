import { Link } from "@inertiajs/react";
import Logo from "@public/logo.webp";
import BackgroundOverlay from "../../Components/BackgroundOverlay";
import Input from "../../Components/Input";

export default function Signup() {
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="Toto Asukal"
                        />
                    </div>
                    <div>
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                        />
                    </div>

                    <div>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            minlength="8"
                        />
                    </div>
                    <div>
                        <Input
                            label="Confirm Password"
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirm Password"
                            minlength="8"
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

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already registered?{" "}
                    <Link href="/login" className="font-semibold text-primary">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
