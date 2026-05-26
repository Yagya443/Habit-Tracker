import React from "react";
import NavBar from "../../Components/NavBar";
import { FaGripfire } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import BarGraph from "../Insights/BarGraph";
import BarGraph2 from "../Insights/BarGraph2";
import PieChart from "../Insights/PieChart";
import Analysis from "../Insights/Analysis";

const Statistics = () => {
    return (
        <>
            <NavBar />
            <div className="ml-68 pl-12 pr-22 pt-6 bg-[#f6f2ec] min-h-screen">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-semibold">Statistics</h1>
                        <h3 className="mt-2">
                            Deep insights from your habit data.
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-4">
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold text-green-400 flex items-center gap-2">
                            <FaGripfire fill="#05df72" /> BEST STREAK
                        </p>
                        <div className="bg-white rounded-2xl py-3 flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-xl text-xl">
                                💧
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    Drink 2L of water
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    13 days
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                            <FaTrophy fill="oklch(85.2% 0.199 91.936) " />
                            LONGEST EVER
                        </p>
                        <div className="bg-white rounded-2xl py-3 flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-xl text-xl">
                                💧
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    Drink 2L of water
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    13 days
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold text-red-400 flex items-center gap-2">
                            <FaArrowTrendDown fill="oklch(70.4% 0.191 22.216)" />
                            NEEDS ATTENTION
                        </p>
                        <div className="bg-white rounded-2xl py-3 flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-xl text-xl">
                                💧
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    Drink 2L of water
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    13 days
                                </p>
                            </div>
                        </div>
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
            </div>
        </>
    );
};

export default Statistics;
