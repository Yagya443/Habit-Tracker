import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiDark } from "react-icons/ci";

const SignUp = () => {
    const navigate = useNavigate();

    const [passwordHide, setPasswordHide] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSignIn = async () => {
        try {
            //  console.log({ name, email, password });

            const response = await axios.post(
                `${import.meta.env.RENDER_URL}/user/signUp`,
                {
                    name,
                    email,
                    password,
                },
            );

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="flex gap-4 items-center justify-center flex-col h-screen bg-[#f6f2ec] ">
            <CiDark
                size={45}
                className="absolute bg-white rounded right-6 top-6"
            />
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-orange-400 p-2 rounded-xl shadow-md">
                    <Sparkles className="text-white w-5 h-5" />
                </div>

                <h1 className="text-2xl font-semibold text-gray-800">
                    AI Habit Tracker
                </h1>
            </div>
            <div className="bg-white w-full max-w-md rounded-2xl border border-gray-100 shadow-sm p-8">
                <div>
                    <p className="text-4xl font-bold text-gray-900">
                        Create your account
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        Free forever. Takes 30 seconds.
                    </p>
                </div>

                <div className="flex flex-col mt-6">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Field */}
                <div className="flex flex-col mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>

                    <div className="flex items-center gap-2">
                        <input
                            type={`${passwordHide ? "password" : "text"}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
                        />
                        <div onClick={() => setPasswordHide(!passwordHide)}>
                            {passwordHide ? (
                                <FaEyeSlash size={25} />
                            ) : (
                                <FaEye size={22} />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    className="w-full mt-6 bg-orange-400 text-white font-semibold py-3 rounded-xl shadow-md cursor-pointer transition duration-300"
                    onClick={handleSignIn}
                >
                    Create account
                </button>

                <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?{" "}
                    <span
                        className="text-orange-400 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
