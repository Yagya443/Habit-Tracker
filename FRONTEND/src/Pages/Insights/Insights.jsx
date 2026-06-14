import React, { useEffect, useState } from "react";
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
import axios from "axios";

import BarGraph from "./BarGraph";
import BarGraph2 from "./BarGraph2";
import PieChart from "./PieChart";
import Analysis from "./Analysis";

const Insights = () => {
    const [habitdata, setHabitdata] = useState([]);
    const [topHabit, setTopHabit] = useState(null);

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

            var maxCompletedLength = 0;
            response.data.forEach((abc) => {
                var completedLength = abc.completedDates.length;

                maxCompletedLength = Math.max(
                    completedLength,
                    maxCompletedLength,
                );
            });

            setTopHabit(
                response.data.find(
                    (val) => val.completedDates.length === maxCompletedLength,
                ),
            );
            // console.log(
            //     response.data.find(
            //         (val) => val.completedDates.length === maxCompletedLength,
            //     ),
            // );
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const totalHabit = habitdata.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalTodayStreak = habitdata.filter((habit) => {
        const lastDay = new Date(habit.lastCompletedDate);
        lastDay.setHours(0, 0, 0, 0);

        return lastDay.getTime() === today.getTime();
    }).length;

    // console.log(totalTodayStreak);

    // const highestStreakHabit =
    //     habitdata.length > 0
    //         ? habitdata.reduce((maxHabit, habit) =>
    //               habit.streak > maxHabit.streak ? habit : maxHabit,
    //           )
    //         : null;

    const totalCompletedDates = habitdata.reduce(
        (prev, curr) => prev + curr.completedDates.length,
        0,
    );
    const totalStreakCount = habitdata.reduce(
        (prev, curr) => prev + curr.streak,
        0,
    );

    // console.log(totalCompletedDates,totalStreakCount);

    const dayCount = {};

    habitdata.forEach((habit) => {
        habit.completedDates.forEach((date) => {
            const day = new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
            });

            dayCount[day] = (dayCount[day] || 0) + 1;
        });
    });

    const bestDay =
        Object.keys(dayCount).length > 0
            ? Object.entries(dayCount).reduce((max, curr) =>
                  curr[1] > max[1] ? curr : max,
              )
            : ["N/A", 0];

    // console.log(dayCount);
    // console.log(bestDay);
    // console.log(topHabit);

    useEffect(() => {
        fetchHabitInfo();
    }, []);

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

                <div className="grid grid-cols-4 gap-6 mt-4">
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <TbActivityHeartbeat /> Completions
                        </p>
                        <h2 className="text-4xl font-bold">
                            {/* {((totalStreak / totalHabit) * 100).toFixed(2)}% */}
                            {((totalTodayStreak / totalHabit) * 100).toFixed(2)}
                            %
                        </h2>
                        <h2 className="text-sm">
                            {totalTodayStreak} of {totalHabit}
                        </h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <FaArrowTrendUp />
                            Completions Rate
                        </p>
                        <h2 className="text-4xl font-bold">
                            {(
                                (totalStreakCount / totalCompletedDates) *
                                100
                            ).toFixed(2)}
                            %
                        </h2>
                        <h2 className="text-sm">this week</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <FaCalendarAlt />
                            Best Day
                        </p>
                        <h2 className="text-4xl font-bold">{bestDay[0]}</h2>
                        <h2 className="text-sm">{bestDay[1]} habits done</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold flex items-center gap-2">
                            <CiTrophy />
                            Top Habit
                        </p>
                        <h2 className="text-2xl font-bold">
                            {topHabit?.title}
                        </h2>
                        <h2 className="text-sm">{topHabit?.completedDates.length} days</h2>
                        
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
                        <p className="font-light">
                            {totalTodayStreak}/{totalHabit}
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {habitdata.map((habit, idx) => (
                            <div
                                key={idx}
                                className="min-w-48 max-h-24 bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3"
                            >
                                <div
                                    className="p-2 rounded-xl text-xl"
                                    style={{ backgroundColor: habit.color }}
                                >
                                    {habit.icon}
                                </div>
                                <div>
                                    <h1 className="font-semibold text-gray-800 ">
                                        {habit.description}
                                    </h1>

                                    <p className="text-sm text-orange-500 font-medium">
                                        🔥 {habit.streak} days
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Insights;
