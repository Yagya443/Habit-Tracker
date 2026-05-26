import React from "react";
import { BsStars } from "react-icons/bs";
import { FaChevronDown, FaGripfire, FaPlus, FaTrophy } from "react-icons/fa";
import NavBar from "../../Components/NavBar";
import { RiTodoLine } from "react-icons/ri";
import { IoIosTrendingUp } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiTrophy } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";

import BarGraph from "./BarGraph";
import BarGraph2 from "./BarGraph2";
import PieChart from "./PieChart";
import Analysis from "./Analysis";

const Insights = () => {
    return (
        <>
            <NavBar />
            <div className="ml-68 pl-12 pr-22 pt-6 bg-[#f6f2ec] min-h-screen">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-semibold">
                            Weekly Insights
                        </h1>
                        <h3 className="mt-2">Apr 27-- May 3, 2026</h3>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="flex py-2 items-center gap-2 text-md rounded-xl font-semibold px-4 bg-white"
                            // onClick={() => setSuggestNewHabitModel(true)}
                        >
                            <IoReload /> Suggest A Habit
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50  py-2 px-4 mt-8 relative transition-all rounded-2xl">
                    <div className="flex items-center gap-4 ">
                        <div className="bg-amber-500 rounded-xl p-1">
                            <MdOutlineCampaign size={30} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">
                                AI Weekly Report
                            </h2>
                            <p className="text-md font-light">
                                See patterns and personalised encouragement from
                                the past 7 days
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mt-4">
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <TbActivityHeartbeat /> Completions
                        </p>
                        <h2 className="text-4xl font-bold">56%</h2>
                        <h2 className="text-sm">39 of 70</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <FaArrowTrendUp />
                            Completions Rate
                        </p>
                        <h2 className="text-4xl font-bold">39%</h2>
                        <h2 className="text-sm">this week</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <FaCalendarAlt />
                            Best Day
                        </p>
                        <h2 className="text-4xl font-bold">Sat</h2>
                        <h2 className="text-sm">11 habits done</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <CiTrophy />
                            Top Habit
                        </p>
                        <h2 className="text-2xl font-bold">
                            Drint 2L of water
                        </h2>
                        <h2 className="text-sm">6/7 days</h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="bg-blue-200">
                        <BarGraph />
                    </div>
                    <div className="bg-blue-200">
                        <BarGraph2 />
                    </div>
                    <div className="bg-blue-200">
                        <PieChart />
                    </div>
                    <div className="bg-blue-200">
                        <Analysis />
                    </div>
                </div>

                <div className="bg-white mt-8 py-4 px-8 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <p className="font-bold">Active Streak</p>
                        <p className="font-light">10/10</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="min-w-48 bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-xl text-xl">
                                💧
                            </div>

                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    Drink 2L of water
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    🔥 13 days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Insights;
