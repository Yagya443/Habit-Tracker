import React from "react";
import { Check } from "lucide-react";

const WeeklyTracker = ({ habitdata,currentWeek }) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(currentWeek);
        day.setDate(currentWeek.getDate() + i);

        weekDays.push(day);
    }

    return (
        <div className="">
            {/* Header */}
            <div className="grid grid-cols-8 gap-4 border-b pb-4 mb-4">
                <h1 className="font-semibold text-gray-700">HABIT</h1>

                {days.map((day, idx) => (
                    <div
                        key={idx}
                        className="text-center font-medium text-gray-500"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                {habitdata.map((habit, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-8 gap-4 items-center"
                    >
                        <div className="font-medium text-gray-700">
                            {habit.title}
                        </div>

                    

                        {/* {weekDays.map((day, i) => {
                            const done = habit.completedDates?.some(
                                (date) =>
                                    new Date(date).toDateString() ===
                                    day.toDateString(),
                            );

                            return (
                                <div
                                    key={i}
                                    className={`h-10 w-10 rounded-xl flex items-center justify-center mx-auto ${
                                        done
                                            ? "text-white shadow-md"
                                            : "bg-gray-100"
                                    }`}
                                    style={{
                                        backgroundColor: done
                                            ? habit.color
                                            : undefined,
                                    }}
                                >
                                    {done && <Check size={18} />}
                                </div>
                            );
                        })} */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyTracker;
