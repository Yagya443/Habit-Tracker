import React from "react";
import { Check } from "lucide-react";

const WeeklyTracker = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const habits = [
        {
            name: "Drink 2L of water",
            color: "bg-sky-500",
            completed: [true, true, true, true, true, true, false],
        },
        {
            name: "Morning run",
            color: "bg-red-500",
            completed: [false, true, true, true, true, true, false],
        },
        {
            name: "Meditate",
            color: "bg-purple-500",
            completed: [true, false, true, false, true, true, false],
        },
        {
            name: "Journal",
            color: "bg-pink-500",
            completed: [false, false, true, false, true, true, false],
        },
        {
            name: "Strength training",
            color: "bg-orange-500",
            completed: [true, true, false, false, false, true, false],
        },
    ];

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

            {/* Habit Rows */}
            <div className="flex flex-col gap-4">
                {habits.map((habit, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-8 gap-4 items-center"
                    >
                        {/* Habit Name */}
                        <div className="font-medium text-gray-700">
                            {habit.name}
                        </div>

                        {/* Days */}
                        {habit.completed.map((done, i) => (
                            <div
                                key={i}
                                className={`
                                    h-10 w-10 rounded-xl flex items-center justify-center mx-auto
                                    ${
                                        done
                                            ? `${habit.color} text-white shadow-md`
                                            : "bg-gray-100"
                                    }
                                `}
                            >
                                {done && <Check size={18} />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyTracker;
