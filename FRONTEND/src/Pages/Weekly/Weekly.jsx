import React from "react";
import NavBar from "../../Components/NavBar";
import { SlCalender } from "react-icons/sl";
import WeeklyHabitTracker from "./WeeklyHabitTracker";

const Weekly = () => {
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
                        <button>{"<"}</button>
                        <button>
                            <SlCalender />
                            Date
                        </button>
                        <button>{">"}</button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mt-4">
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold ">Weekly Rate</p>
                        <h2 className="text-4xl font-bold">56%</h2>
                        <h2 className="text-sm">39 of 70</h2>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 ">
                        <p className="text-sm font-semibold ">Total Completions</p>
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
                        <h2 className="text-2xl font-bold">Drint 2L of water</h2>
                        <h2 className="text-sm">6/7 days</h2>
                    </div>
                </div>

              <div className="bg-white mt-6 rounded-xl py-4 px-6">
                {/* <WeeklyHabitTracker /> */}
              </div>

            </div>
        </>
    );
};

export default Weekly;
