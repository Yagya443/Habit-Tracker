import { LogOut, Moon, Settings, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState("");

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios(
                "http://localhost:5000/user/me",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setUser(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div className="w-68 h-screen fixed flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="bg-orange-400 p-3 rounded-2xl shadow-lg">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            AI Habit Tracker
                        </h1>

                        <p className="text-sm text-gray-500">
                            Build better habits daily
                        </p>
                    </div>
                </div>

                <hr />

                <div className="flex flex-col gap-2 p-3">
                    <NavLink
                        to={"/dashboard"}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-orange-400 text-white shadow-md"
                                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to={"/habits"}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-orange-400 text-white shadow-md"
                                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                            }`
                        }
                    >
                        Habits
                    </NavLink>

                    <NavLink
                        to={"/weekly"}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-orange-400 text-white shadow-md"
                                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                            }`
                        }
                    >
                        Weekly
                    </NavLink>

                    <NavLink
                        to={"/insights"}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-orange-400 text-white shadow-md"
                                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                            }`
                        }
                    >
                        Insights
                    </NavLink>

                    <NavLink
                        to={"/statistics"}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-orange-400 text-white shadow-md"
                                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-500"
                            }`
                        }
                    >
                        Statistics
                    </NavLink>
                </div>
            </div>

            <div>
                <hr />
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
                        <Moon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">
                            Dark mode
                        </span>
                    </button>

                    <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
                        <Settings className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-medium">
                            Settings
                        </span>
                    </button>
                </div>

                <hr />

                <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                            {/* {user?.name} */}
                            {user?.name?.split("")[0]}
                        </div>

                        <div>
                            <h1 className="text-sm font-semibold text-gray-800">
                                {user?.name}
                            </h1>

                            <p className="text-xs text-gray-500 truncate w-32">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <LogOut
                        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-orange-500 transition"
                        onClick={handleLogOut}
                    />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
