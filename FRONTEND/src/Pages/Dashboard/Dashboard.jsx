import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar";
import { FaPlus } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { FaGripfire } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { RiTodoLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import HabitsList from "./HabitsList";
import { MdOutlineCampaign } from "react-icons/md";
import CreateNewHabit from "./CreateNewHabit";
import SuggestNewHabitModel from "./SuggestNewHabitModel";
import axios from "axios";

const Dashboard = () => {
    const [message1, setMessage1] = useState(true);
    const [message2, setMessage2] = useState(true);
    const [message3, setMessage3] = useState(false);
    // const [openNewHabitModel, setOpenNewHabitModel] = useState(false);
    const [modeldata, setModeldata] = useState({
        isOpen: false,
        mode: "create",
        habit: null,
    });

    const [suggestNewHabitModel, setSuggestNewHabitModel] = useState(false);
    const [habitdata, setHabitdata] = useState([]);
    const [createHabit, setCreateHabit] = useState([]);
    const [user, setUser] = useState(null);

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
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    async function handleCreateHabit(
        title,
        description,
        category,
        icon,
        color,
    ) {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/habit/createHabit",
                {
                    title,
                    description,
                    category,
                    icon,
                    color,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setCreateHabit(response.data);
            setModeldata({
                isOpen: false,
                habit: null,
                mode: "create",
            });
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchHabitInfo();
        // fetchUser();
    }, []);

    return (
        <>
            <NavBar />
            <div className="ml-68 pl-12 pr-22 pt-6 bg-[#f6f2ec] ">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-semibold">
                            Hey {user?.name},
                        </h1>
                        <h3 className="mt-2">Saturday 23 April</h3>
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
                            onClick={() =>
                                setModeldata({
                                    isOpen: true,
                                    habit: null,
                                    mode: "create",
                                })
                            }
                        >
                            <FaPlus /> New Habit
                        </button>
                    </div>
                </div>
                {modeldata.isOpen && (
                    <CreateNewHabit
                        setModeldata={setModeldata}
                        handleCreateHabit={handleCreateHabit}
                        modeldata={modeldata}
                    />
                )}
                {suggestNewHabitModel && (
                    <SuggestNewHabitModel
                        setSuggestNewHabitModel={setSuggestNewHabitModel}
                    />
                )}

                {message1 && (
                    <div className="bg-yellow-200 flex items-center gap-4 py-2 px-4 mt-8 relative rounded-2xl">
                        <div className="bg-amber-500 rounded-xl p-1">
                            <RiSunLine size={30} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">
                                GOOD MORNING, Alex
                            </h2>
                            <p className="text-md font-semibold">
                                Thinking of Something Nice To Say...{" "}
                            </p>
                        </div>
                        <RxCross2
                            onClick={() => setMessage1(false)}
                            size={30}
                            className="hover:cursor-pointer absolute top-2 right-2"
                        />
                    </div>
                )}
                {message2 && (
                    <div className="bg-[#FFD2E0]  relative rounded-2xl mt-8 py-2">
                        <div className="flex items-center gap-4  px-4 ">
                            <div className="bg-[#FF0883] rounded-xl p-1">
                                <FaRegHeart size={30} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Streak Paused, Side Project-1Hr
                                </h2>
                                <p className="text-md font-semibold">
                                    You have A Great track, Breaking Streak are
                                    Part of Your Journey
                                </p>
                            </div>
                            <RxCross2
                                onClick={() => setMessage2(false)}
                                size={30}
                                className="hover:cursor-pointer absolute top-2 right-2"
                            />
                        </div>
                        <button className="bg-amber-400 ml-18 text-xl rounded-xl px-4 py-1 mt-2 text-white">
                            Go Back on Track
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-4 gap-8 mt-8">
                    <div className="bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                        <RiTodoLine
                            size={45}
                            className="border-2 rounded bg-blue-100 border-blue-300 p-1"
                        />
                        <div>
                            <h2 className="text-gray-400 text-lg">
                                Total Habits
                            </h2>
                            <h2 className="text-xl font-semibold">
                                {habitdata.length}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                        <FaGripfire
                            size={45}
                            className="border-2 rounded bg-amber-100 border-amber-300 p-1"
                        />
                        <div>
                            <h2 className="text-gray-400 text-lg">
                                Active Streak
                            </h2>
                            <h2 className="text-xl font-semibold">8</h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                        <FaTrophy
                            size={45}
                            className="border-2 rounded bg-[#FDE5F2] border-[#F7AFBA] p-1"
                        />
                        <div>
                            <h2 className="text-gray-400 text-lg">
                                Best Streak
                            </h2>
                            <h2 className="text-xl font-semibold">8</h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                        <IoIosTrendingUp
                            size={45}
                            className="border-2 bg-green-100 rounded border-green-300 p-1"
                        />
                        <div>
                            <h2 className="text-gray-400 text-lg">This Week</h2>
                            <h2 className="text-xl font-semibold">57%</h2>
                        </div>
                    </div>
                </div>

                <div className="min-h-48 bg-white mt-12 pb-4 rounded-3xl">
                    <HabitsList
                        habitdata={habitdata}
                        setHabitdata={setHabitdata}
                    />
                </div>

                <div
                    className="bg-blue-100  py-2 px-4 mt-8 relative transition-all rounded-2xl"
                    onClick={() => setMessage3(!message3)}
                >
                    <div className="flex items-center gap-4 ">
                        <div className="bg-amber-500 rounded-xl p-1">
                            <MdOutlineCampaign size={30} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">
                                AI Weekly Report
                            </h2>
                            <p className="text-md font-light">
                                See patterns and personalised encouragement from
                                the past 7 days
                            </p>
                        </div>
                        {!message3 ? (
                            <FaChevronDown
                                className="hover:cursor-pointer absolute top-4 right-4"
                                size={25}
                            />
                        ) : (
                            <FaChevronUp
                                className="hover:cursor-pointer absolute top-4 right-4"
                                size={25}
                            />
                        )}
                    </div>

                    {message3 && (
                        <button className="bg-amber-300 py-1 px-4 rounded-xl text-lg mt-2 text-white hover:opacity-70 transition-all hover:cursor-pointer">
                            Generate A Weekly Report{" "}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
