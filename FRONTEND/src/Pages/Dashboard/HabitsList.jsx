import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import axios from "axios";
import { BsStars } from "react-icons/bs";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { AiOutlineFire } from "react-icons/ai";
import HabitCard from "./HabitCard";
// import HabitCard from './'

const HabitsList = ({ habitdata, setHabitdata, modeldata, setModeldata }) => {
    

    const handlecompleted = useCallback(
        async (id) => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.put(
                    `${import.meta.env.VITE_RENDER_URL}/habit/completeHabit/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setHabitdata((prev) =>
                    prev.map((habit) =>
                        habit._id === id ? response.data : habit,
                    ),
                );
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        },
        [setHabitdata],
    );

    const handleDeleteHabit = useCallback(async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(
                `${import.meta.env.VITE_RENDER_URL}/habit/deleteHabit/${id}`,
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
    });

    const completed = useMemo(
        () =>
            habitdata.reduce((prev, curr) => {
                if (curr.completed) {
                    return prev + 1;
                }
                return prev;
            }, 0),
        [habitdata],
    );

    const total = habitdata.length;

    const percentage = (completed / total) * 100;

    const data = useMemo(
        () => [
            { name: "Completed", value: completed },
            { name: "Remaining", value: total - completed },
        ],
        [total, completed],
    );

    const COLORS = ["#f97316", "#e5e7eb"];

    function handleCompletedDate(lastCompletedDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const completedDate = new Date(lastCompletedDate);
        completedDate.setHours(0, 0, 0, 0);

        return completedDate.getTime() === today.getTime();
    }

    const handleEditHabit = useCallback((habit) => {
        setModeldata({
            isOpen: true,
            habit,
            mode: "edit",
        });
    });

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
                {habitdata.map((habit) => (
                    <HabitCard
                        key={habit._id}
                        habit={habit}
                        // isMenuOpen={openMenu === habit._id}
                        // onToggleMenu={() => setOpenMenu(habit._id)}
                        onComplete={handlecompleted}
                        onDelete={handleDeleteHabit}
                        onEdit={handleEditHabit}
                        // menuRef={menuRef}
                        handleCompletedDate={handleCompletedDate}
                    />
                ))}
            </div>
        </>
    );
};

export default HabitsList;
