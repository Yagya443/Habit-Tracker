import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { SlCalender } from "react-icons/sl";
import WeeklyHabitTracker from "./WeeklyHabitTracker";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import axios from "axios";

const Weekly = () => {
    const [habitdata, setHabitdata] = useState([]);
    const [topHabitNumber, setTopHabitNumber] = useState(null);
    const [topHabitTitle, setTopHabitTitle] = useState(null);

    const [currentWeek, setCurrentWeek] = useState(() => {
        const today = new Date();

        const day = today.getDay();
        const diff = day === 0 ? -6 : 1 - day;

        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);

        return monday;
    });

    const handlePreviousWeek = () => {
        setCurrentWeek((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setCurrentWeek((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    };

    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const formatDate = (date) =>
        date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        });

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

            var maxCompletedLength = 0;
            response.data.forEach((abc) => {
                var completedLength = abc.completedDates.length;

                maxCompletedLength = Math.max(
                    completedLength,
                    maxCompletedLength,
                );
                setTopHabit(maxCompletedLength);
            });

            const findTitle = response.data.find(
                (val) => val.completedDates.length === maxCompletedLength,
            );

            // setTopHabitTitle(findTitle.title)
            

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

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
                            Weekly Overview
                        </h1>
                        <h3 className="mt-2">
                            See Every Habit Across All 7 Days At A Glance
                        </h3>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="bg-white px-3 rounded-xl"
                            onClick={handlePreviousWeek}
                        >
                            <GrPrevious />
                        </button>

                        <button className="bg-white flex items-center gap-2 px-4 py-2 rounded-xl">
                            <SlCalender />
                            {formatDate(currentWeek)} - {formatDate(weekEnd)}
                        </button>

                        <button
                            className="bg-white px-3 rounded-xl"
                            onClick={handleNextWeek}
                        >
                            <GrNext />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mt-4">
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold ">Weekly Rate</p>
                        <h2 className="text-4xl font-bold">56%</h2>
                        <h2 className="text-sm">39 of 70</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold ">
                            Total Completions
                        </p>
                        <h2 className="text-4xl font-bold">39%</h2>
                        <h2 className="text-sm">this week</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold ">Best Day</p>
                        <h2 className="text-4xl font-bold">Sat</h2>
                        <h2 className="text-sm">11 habits done</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold ">Top Habit</p>
                        <h2 className="text-2xl font-bold">
                            {/* {topHabitTitle} */}
                        </h2>
                        <h2 className="text-sm">{topHabitNumber} days</h2>
                    </div>
                </div>

                <div className="bg-white mt-6 rounded-xl py-4 px-6">
                    <WeeklyHabitTracker
                        currentWeek={currentWeek}
                        habitdata={habitdata}
                    />
                </div>
            </div>
        </>
    );
};

export default Weekly;
