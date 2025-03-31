import { Link } from "@inertiajs/react";
import Logo from "@public/logo.webp";
import BackgroundOverlay from "../../Components/BackgroundOverlay";

export default function Login() {
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <BackgroundOverlay />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src={Logo}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium "
                        >
                            Email Address
                        </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                className="input validator w-full"
                                type="email"
                                required
                                placeholder="mail@site.com"
                            />
                            <div className="validator-hint">
                                Enter valid email address
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium "
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold ">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                className="input validator w-full"
                                required
                                placeholder="Password"
                                minlength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            />
                            <p className="validator-hint">
                                Must be more than 8 characters, including
                                <br />
                                At least one number
                                <br />
                                At least one lowercase letter
                                <br />
                                At least one uppercase letter
                            </p>
                        </div>
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

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not registered?{" "}
                    <Link href="/signup" className="font-semibold text-primary">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
}
