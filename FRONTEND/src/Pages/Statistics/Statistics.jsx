import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import { FaGripfire } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import BarGraph from "../Insights/BarGraph";
import BarGraph2 from "../Insights/BarGraph2";
import PieChart from "../Insights/PieChart";
import Analysis from "../Insights/Analysis";

const Statistics = () => {
    const [habitdata, setHabitdata] = useState([]);

    const [bestActiveStreak, setBestActiveStreak] = useState(0);

    const fetchHabitInfo = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/habit/getHabit",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setHabitdata(response.data);
            // console.log(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const bestStreak = habitdata
        .filter((habit) => habit.streak > 0)
        .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const longestStreak = habitdata.toSorted(
        (a, b) => b.completedDates.length - a.completedDates.length,
    );

    const needAttention = habitdata.toSorted(
        (a, b) => a.completedDates.length - b.completedDates.length,
    );

    // console.log("longestStreak",longestStreak);
    // console.log("needAttention",needAttention);

    useEffect(() => {
        fetchHabitInfo();
    }, []);

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
                            <div
                                className=" p-2 rounded-xl text-xl"
                                style={{
                                    backgroundColor: `${longestStreak[0]?.color}`,
                                }}
                            >
                                {bestStreak[0]?.icon}
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    {bestStreak[0]?.title}
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    {bestStreak[0]?.streak} days
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
                            <div
                                className="p-2 rounded-xl text-xl"
                                style={{
                                    backgroundColor: `${longestStreak[0]?.color}`,
                                }}
                            >
                                {longestStreak[0]?.icon}
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    {longestStreak[0]?.title}
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    {longestStreak[0]?.completedDates.length}{" "}
                                    days
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
                            <div
                                className="bg-sky-100 p-2 rounded-xl text-xl"
                                style={{
                                    backgroundColor: `${needAttention[0]?.color}`,
                                }}
                            >
                                {needAttention[0]?.icon}
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-800">
                                    {needAttention[0]?.title}
                                </h1>

                                <p className="text-sm text-orange-500 font-medium">
                                    {needAttention[0]?.completedDates.length}{" "}
                                    days
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
