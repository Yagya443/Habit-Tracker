import React, { useState } from "react";
import { BsStars, BsThreeDots } from "react-icons/bs";
import { FaArchive, FaFire, FaPlus } from "react-icons/fa";
import NavBar from "../../Components/NavBar";
import { MdDone } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import CreateNewHabit from "../Dashboard/CreateNewHabit";
import SuggestNewHabitModel from "../Dashboard/SuggestNewHabitModel";

const Habits = () => {
    const [openNewHabitModel, setOpenNewHabitModel] = useState(false);
    const [suggestNewHabitModel, setSuggestNewHabitModel] = useState(false);

    return (
        <>
            <NavBar />
            <div className="ml-68 pl-12 pr-22 pt-6 bg-[#f6f2ec] ">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-semibold">Hey Alex</h1>
                        <h3 className="mt-2">
                            Manage Every habit you've created ever.
                        </h3>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="flex py-2 items-center gap-2 text-md rounded-xl font-semibold px-4 bg-white"
                            onClick={() => setSuggestNewHabitModel(true)}
                        >
                            <BsStars /> Suggest A Habit
                        </button>
                        <button
                            className="flex py-2 items-center gap-2 text-md rounded-xl font-semibold px-4 bg-amber-500 text-white"
                            onClick={() => setOpenNewHabitModel(true)}
                        >
                            <FaPlus /> New Habit
                        </button>
                    </div>
                </div>

                {openNewHabitModel && (
                    <CreateNewHabit
                        setOpenNewHabitModel={setOpenNewHabitModel}
                    />
                )}
                {suggestNewHabitModel && (
                    <SuggestNewHabitModel
                        setSuggestNewHabitModel={setSuggestNewHabitModel}
                    />
                )}

                <div className="h-12 bg-white mt-12 px-6 rounded-2xl flex items-center justify-between">
                    <input
                        className="w-2/3 px-4 py-1 rounded-md border-2"
                        placeholder="Serach Habits..."
                    />
                    <select className="border rounded-md py-1 px-4">
                        <option>All category</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Health">Health</option>
                        <option value="Learning">Learning</option>
                        <option value="Mindfullness">Mindfullness</option>
                        <option value="Social">Social</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Finance">Finance</option>
                        <option value="Creativity">Creativity</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="flex  gap-2 rounded-xl items-center border">
                        <div className="bg-amber-200 text-amber-600 rounded-bl-xl rounded-tl-xl px-4 py-1">
                            Active.11
                        </div>
                        <div className="px-4">Archived.0</div>
                    </div>
                </div>

                <div className="px-2 flex flex-col gap-2 mt-6 min-h-[70vh]">
                    <div className=" rounded-xl mx-4 px-4 flex items-center justify-between bg-white py-2">
                        <div className="flex items-center gap-6">
                            <div className="bg-blue-300 rounded p-1 text-2xl">
                                👁️
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-xl">Drink Water</h1>
                                    <p className="bg-gray-300 rounded-2xl px-2">
                                        Health
                                    </p>
                                </div>
                                <p className="font-light">
                                    Stay Hydrated Thrughtout The day{" "}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <AiOutlineFire
                                    fill="oklch(76.9% 0.188 70.08)"
                                    size={25}
                                />
                                15
                            </div>
                            <div className="flex items-center">
                                <CiTrophy
                                    size={30}
                                    fill="oklch(76.9% 0.188 70.08)"
                                />
                                15
                            </div>
                            <FaPencilAlt size={20} />
                            <FaArchive size={20} />

                            <MdDeleteOutline
                                fill="#fff"
                                className="bg-red-500 rounded-full p-1"
                                size={40}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Habits;
