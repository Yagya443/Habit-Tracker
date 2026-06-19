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
                `${process.env.RENDER_URL}/user/me`,

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
        <div className="sidebar-brand w-68 h-screen fixed flex flex-col justify-between">
            <div>
                <div className="sidebar-navigation flex items-center gap-3 px-4 py-3">
                    <div className="bg-orange-400 p-3 rounded-2xl shadow-lg">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>

                    <div className="sidebar-brand">
                        <h1 className="text-xl font-bold text-gray-800">
                            AI Habit Tracker
                        </h1>

                        <p className="text-sm text-gray-500">
                            Build better habits daily
                        </p>
                    </div>
                </div>

                <hr />

                <div className="sidebar-navigation flex flex-col gap-2 p-3">
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

            <div className="sidebar-footer">
                <hr /> <hr />
                <div className="sidebar-user flex items-center justify-between px-2 py-1">
                    <div className="sidebar-user-info flex items-center gap-3">
                        <div className="sidebar-user-avatar w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                            {user?.name?.split("")[0]}
                        </div>

                        <div className="sidebar-user-details">
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
