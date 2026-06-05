import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { FaFire } from "react-icons/fa";

import { BsStars } from "react-icons/bs";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { AiOutlineFire } from "react-icons/ai";

const HabitsList = ({ habitdata, setHabitdata }) => {
    function handlecompleted(id) {
        const updatedHabits = habitdata.map((habit) => {
            if (habit._id === id) {
                return {
                    ...habit,
                    streak: habit.completed
                        ? habit.streak - 1
                        : habit.streak + 1,
                    completed: !habit.completed,
                };
            }
            return habit;
        });

        setHabitdata(updatedHabits);
    }


    const completed = 4;
    const total = 8;

    const percentage = (completed / total) * 100;

    const data = [
        { name: "Completed", value: completed },
        { name: "Remaining", value: total - completed },
    ];

    const COLORS = ["#f97316", "#e5e7eb"];

    return (
        <>
            <div className="pt-4  flex items-center justify-between px-6">
                <div className="">
                    <h1 className="text-2xl font-semibold">Today's Habits</h1>
                    <p className="font-light">4 of 8 Completed</p>
                </div>
                <div className="h-20 w-20">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={20}
                            outerRadius={25}
                            paddingAngle={1}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}

                            <Label
                                value={`${percentage}%`}
                                position="center"
                                className="text-black text-md font-bold"
                            />
                        </Pie>
                    </PieChart>
                </div>
            </div>

            <div className="px-2 flex flex-col gap-2">
                {habitdata.map((habits, idx) => (
                    <div
                        className={`rounded-xl mx-4 px-4 flex items-center justify-between py-2 ${
                            habits.completed ? "bg-amber-50" : "bg-amber-100"
                        }`}
                        key={habits._id}
                    >
                        <div className="flex items-center gap-6">
                            <div
                                className={` rounded p-1 text-2xl `}
                                style={{ backgroundColor: habits.color }}
                            >
                                {habits.icon}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-xl">{habits.title}</h1>
                                    <p className="bg-gray-300 rounded-2xl px-2">
                                        {habits.category}
                                    </p>
                                </div>
                                <p className="font-light">
                                    {habits.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <AiOutlineFire
                                    fill="oklch(76.9% 0.188 70.08)"
                                    size={25}
                                />
                                {habits.streak}
                            </div>
                            <BsThreeDots size={30} />
                            <MdDone
                                fill="#fff"
                                className="bg-amber-500 rounded-full p-1"
                                size={50}
                                onClick={() => handlecompleted(habits._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HabitsList;
