import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavBar from "../../Components/NavBar";
import { SlCalender } from "react-icons/sl";
import WeeklyHabitTracker from "./WeeklyHabitTracker";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import axios from "axios";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiTrophy } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";

const Weekly = () => {
    const [habitdata, setHabitdata] = useState([]);
    const [topHabit, setTopHabit] = useState(null);
    const [loading, setLoading] = useState(false);

    const [currentWeek, setCurrentWeek] = useState(() => {
        const today = new Date();

        const day = today.getDay();
        const diff = day === 0 ? -6 : 1 - day;

        const monday = new Date(today);
        monday.setDate(today.getDate() + diff);

        return monday;
    });

    const handlePreviousWeek = useCallback(() => {
        setCurrentWeek((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
    }, []);

    const handleNextWeek = useCallback(() => {
        setCurrentWeek((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    }, []);

    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const formatDate = (date) =>
        date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        });

    const fetchHabitInfo = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_RENDER_URL}/habit/getHabit`,
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
        finally{
            setLoading(false)
        }
    };

    // const createdDate = new Date(topHabit?.createdAt);
    // const today = new Date();

    // const totalDays =
    //     Math.floor((today - createdDate) / (1000 * 60 * 60 * 24)) + 1;

    // const completionRate = (topHabit?.completedDates?.length / totalDays) * 100;

    // console.log(completionRate);

    const totalHabit = habitdata.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalTodayStreak = useMemo(
        () =>
            habitdata.filter((habit) => {
                const lastDay = new Date(habit.lastCompletedDate);
                lastDay.setHours(0, 0, 0, 0);

                return lastDay.getTime() === today.getTime();
            }).length,
        [habitdata],
    );

    // console.log(totalTodayStreak);

    // const highestStreakHabit =
    //     habitdata.length > 0
    //         ? habitdata.reduce((maxHabit, habit) =>
    //               habit.streak > maxHabit.streak ? habit : maxHabit,
    //           )
    //         : null;

    const totalCompletedDates = useMemo(
        () =>
            habitdata.reduce(
                (prev, curr) => prev + curr.completedDates.length,
                0,
            ),
        [habitdata],
    );
    const totalStreakCount = useMemo(
        () => habitdata.reduce((prev, curr) => prev + curr.streak, 0),
        [habitdata],
    );

    // console.log(totalCompletedDates,totalStreakCount);

    const dayCount = useMemo(() => {
        const counts = {};
        habitdata.forEach((habit) => {
            habit.completedDates.forEach((date) => {
                const day = new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                });
                counts[day] = (counts[day] || 0) + 1;
            });
        });
        return counts;
    }, [habitdata]);

    const bestDay = useMemo(() => {
        return Object.keys(dayCount).length > 0
            ? Object.entries(dayCount).reduce((max, curr) =>
                  curr[1] > max[1] ? curr : max,
              )
            : ["N/A", 0];
    }, [dayCount]);

    // console.log(dayCount);
    // console.log(bestDay);
    // console.log(topHabit);

    useEffect(() => {
        fetchHabitInfo();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <NavBar />

                    <div className="weekly-container ml-68 pl-12 pr-22 pt-6 bg-[#f6f2ec] min-h-screen">
                        <div className="weekly-header flex items-center justify-between">
                            <div>
                                <h1 className="text-5xl font-semibold">
                                    Weekly Overview
                                </h1>
                                <h3 className="mt-2">
                                    See Every Habit Across All 7 Days At A
                                    Glance
                                </h3>
                            </div>

                            <div className="weekly-toolbar flex gap-4">
                                <button
                                    className="bg-white px-3 rounded-xl"
                                    onClick={handlePreviousWeek}
                                >
                                    <GrPrevious />
                                </button>

                                <button className="bg-white flex items-center gap-2 px-4 py-2 rounded-xl">
                                    <SlCalender />
                                    {formatDate(currentWeek)} -{" "}
                                    {formatDate(weekEnd)}
                                </button>

                                <button
                                    className="bg-white px-3 rounded-xl"
                                    onClick={handleNextWeek}
                                >
                                    <GrNext />
                                </button>
                            </div>
                        </div>

                        <div className="weekly-stats-grid grid grid-cols-4 gap-6 mt-4">
                            <div className="weekly-completion-card bg-white rounded-xl px-4 py-2 ">
                                <p className="text-sm font-semibold flex items-center gap-2">
                                    <TbActivityHeartbeat /> Completions
                                </p>
                                <h2 className="text-4xl font-bold">
                                    {/* {((totalStreak / totalHabit) * 100).toFixed(2)}% */}
                                    {(
                                        (totalTodayStreak / totalHabit) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </h2>
                                <h2 className="weekly-completion-card__details text-sm">
                                    {totalTodayStreak} of {totalHabit}
                                </h2>
                            </div>
                            <div className="weekly-completion-rate-card bg-white rounded-xl px-4 py-2 ">
                                <p className="text-sm font-semibold flex items-center gap-2">
                                    <FaArrowTrendUp />
                                    Completions Rate
                                </p>
                                <h2 className="text-4xl font-bold">
                                    {(
                                        (totalStreakCount /
                                            totalCompletedDates) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </h2>
                                <h2 className="weekly-completion-rate-card__details text-sm">
                                    this week
                                </h2>
                            </div>
                            <div className="weekly-best-day-card bg-white rounded-xl px-4 py-2 ">
                                <p className="text-sm font-semibold flex items-center gap-2">
                                    <FaCalendarAlt />
                                    Best Day
                                </p>
                                <h2 className="text-4xl font-bold">
                                    {bestDay[0]}
                                </h2>
                                <h2 className="weekly-best-day-card__details text-sm">
                                    {bestDay[1]} habits done
                                </h2>
                            </div>
                            <div className="weekly-top-habit-card bg-white rounded-xl px-4 py-2 ">
                                <p className="text-sm font-semibold flex items-center gap-2">
                                    <CiTrophy />
                                    Top Habit
                                </p>
                                <h2 className="text-2xl font-bold">
                                    {topHabit?.title}
                                </h2>
                                <h2 className="weekly-top-habit-card__details text-sm">
                                    {topHabit?.completedDates.length} days
                                </h2>
                            </div>
                        </div>

                        <div className="weekly-tracker-container bg-white mt-6 rounded-xl py-4 px-6">
                            <WeeklyHabitTracker
                                currentWeek={currentWeek}
                                habitdata={habitdata}
                            />
                        </div>
                        <h1 className="text-4xl text-center mt-12">
                            This page is still Under Maintance
                        </h1>
                    </div>
                </>
            ) : (
                <p className="flex items-center justify-center h-screen text-4xl font-semibold text-[#FF8904]">
                    Loading...
                </p>
            )}
        </>
    );
};

export default Weekly;
