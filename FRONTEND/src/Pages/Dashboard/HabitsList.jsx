import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import axios from "axios";
import { BsStars } from "react-icons/bs";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { AiOutlineFire } from "react-icons/ai";

const HabitsList = ({ habitdata, setHabitdata, modeldata, setModeldata }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handlecompleted = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `${import.meta.env.RENDER_URL}/habit/completeHabit/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setHabitdata((prev) =>
                prev.map((habit) => (habit._id === id ? response.data : habit)),
            );
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleDeleteHabit = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(
                `${import.meta.env.RENDER_URL}/habit/deleteHabit/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setHabitdata((prev) => prev.filter((habit) => habit._id !== id));
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const completed = habitdata.reduce((prev, curr) => {
        if (curr.completed) {
            return prev + 1;
        }
        return prev;
    }, 0);

    const total = habitdata.length;

    const percentage = (completed / total) * 100;

    const data = [
        { name: "Completed", value: completed },
        { name: "Remaining", value: total - completed },
    ];

    const COLORS = ["#f97316", "#e5e7eb"];

    function handleCompletedDate(lastCompletedDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const completedDate = new Date(lastCompletedDate);
        completedDate.setHours(0, 0, 0, 0);

        return completedDate.getTime() === today.getTime();
    }

    const handleEditHabit = (habit) => {
        setModeldata({
            isOpen: true,
            habit,
            mode: "edit",
        });
    };

    return (
        <>
            <div className="pt-4  flex items-center justify-between px-6">
                <div className="">
                    <h1 className="text-2xl font-semibold">Today's Habits</h1>
                    <p className="font-light">
                        {completed} of {total} Completed
                    </p>
                </div>
                <div className="pb-4">
                    <PieChart width={60} height={60}>
                        <Pie
                            data={data}
                            innerRadius={20}
                            outerRadius={30}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}

                            <Label
                                value={`${Math.round(percentage)}%`}
                                position="center"
                                fill="black"
                                fontSize={14}
                                fontWeight="bold"
                            />
                        </Pie>
                    </PieChart>
                </div>
            </div>

            <div className="habit-list-container px-2 flex flex-col gap-2">
                {habitdata.map((habits, idx) => (
                    <div
                        key={habits._id}
                        className={`habit-card rounded-xl mx-4 px-4 flex items-center justify-between py-2 ${
                            handleCompletedDate(habits.lastCompletedDate)
                                ? "bg-amber-50"
                                : "bg-amber-100"
                        }`}
                    >
                        <div className="habit-info-section flex items-center gap-6">
                            <div
                                className={`habit-icon-container rounded p-1 text-2xl `}
                                style={{ backgroundColor: habits.color }}
                            >
                                {habits.icon}
                            </div>
                            <div className="habit-details flex flex-col">
                                <div className="habit-header flex items-center gap-4">
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

                        <div className="habit-actions flex items-center gap-6">
                            <div className="habit-streak flex items-center">
                                <AiOutlineFire
                                    fill="oklch(76.9% 0.188 70.08)"
                                    size={25}
                                />
                                {habits.streak}
                            </div>
                            <BsThreeDots
                                size={30}
                                className="threeDotBtn cursor-pointer"
                                onClick={() => setOpenMenu(habits._id)}
                            />
                            <MdDone
                                fill="#fff"
                                className="habit-complete-btn bg-amber-500 rounded-full p-1 hover:bg-amber-400 cursor-pointer transition duration-200"
                                size={50}
                                onClick={() => handlecompleted(habits._id)}
                            />
                        </div>
                        {openMenu === habits._id && (
                            <div
                                ref={menuRef}
                                className="habit-menu absolute right-48 mb-24  bg-yellow-200 shadow-md rounded px-6 py-2"
                            >
                                <div className="habit-menu-arrow absolute -bottom-2 right-3 w-4 h-4 bg-yellow-200 rotate-45"></div>
                                <p
                                    className="cursor-pointer font-semibold "
                                    onClick={() => handleEditHabit(habits)}
                                >
                                    Edit
                                </p>
                                <p
                                    className="cursor-pointer font-semibold"
                                    onClick={() =>
                                        handleDeleteHabit(habits._id)
                                    }
                                >
                                    Delete
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default HabitsList;
