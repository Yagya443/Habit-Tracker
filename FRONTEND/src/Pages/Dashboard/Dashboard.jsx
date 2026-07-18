import React, { useEffect, useMemo } from "react";
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
    const [bestActiveStreak, setBestActiveStreak] = useState(0);
    const [suggestNewHabitModel, setSuggestNewHabitModel] = useState(false);
    const [habitdata, setHabitdata] = useState([]);
    const [createHabit, setCreateHabit] = useState([]);
    const [user, setUser] = useState(null);
    const [geminiṂotivation, setGeminiṂotivation] = useState(null);
    const [recommendation, setRecommendation] = useState([]);
    const [motivation, setMotivation] = useState("");
    const [days, setDays] = useState("");
    const [report, setReport] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPara, setLoadingPara] = useState(false);

    const fetchHabitInfo = async () => {
        setLoading(true);
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
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEditHabit = async (
        id,
        title,
        description,
        category,
        icon,
        color,
    ) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `${import.meta.env.VITE_RENDER_URL}/habit/editHabit/${id}`,
                {
                    title,
                    description,
                    category,
                    color,
                    icon,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setModeldata({
                isOpen: false,
                habit: null,
                mode: "edit",
            });

            setHabitdata((prev) =>
                prev.map((habit) =>
                    habit._id === id
                        ? {
                              ...habit,
                              title,
                              description,
                              category,
                              icon,
                              color,
                          }
                        : habit,
                ),
            );
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateHabit = async (
        title,
        description,
        category,
        icon,
        color,
    ) => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_RENDER_URL}/habit/createHabit`,
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

            setHabitdata((prev) => [...prev, response.data.habit]);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInfo = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await axios(
                `${import.meta.env.VITE_RENDER_URL}/user/me`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setUser(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const activeStreak = useMemo(() => {
        return habitdata.filter((habit) => habit.streak > 0).length;
    }, [habitdata]);
    // const activeStreak = habitdata.filter((habit) => habit.streak > 0).length;

    const handleEditHabit = (habit) => {
        setModeldata({
            isOpen: true,
            habit,
            mode: "edit",
        });
    };

    const totalStreakCount = useMemo(() => {
        return habitdata.reduce((prev, curr) => (prev += curr.streak), 0);
    }, [habitdata]);

    const totalCompletedDates = useMemo(() => {
        return habitdata.reduce(
            (prev, curr) => prev + curr.completedDates.length,
            0,
        );
    }, [habitdata]);

    const weeklyPercentage = useMemo(
        () => ((totalStreakCount / totalCompletedDates) * 100).toFixed(2),
        [totalStreakCount, totalCompletedDates],
    );

    // console.log('3', typeof recommendation)

    const getQuote = async () => {
        const quote = sessionStorage.getItem("quote");
        if (quote) {
            setMotivation(quote);
            return;
        }
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_RENDER_URL}/ai/quote`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setMotivation(response.data.quote);
            sessionStorage.setItem("quote", response.data.quote);
            // console.log(response.data.quote);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const threeDayPlan = async () => {
        setLoadingPara(true);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_RENDER_URL}/ai/threeDaysPlan`,
                {},
                {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                },
            );

            setDays(response.data.plan);
            // console.log(response.data.plan);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoadingPara(false);
        }
    };

    const weeklyreport = async () => {
        setLoadingPara(true);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_RENDER_URL}/ai/weeklyreport`,
                { habitdata },
                {
                    headers: {
                        Authorization: `bearer: ${token}`,
                    },
                },
            );

            setReport(response.data.report);
            // console.log(response.data.report);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoadingPara(false);
        }
    };

    useEffect(() => {
        setBestActiveStreak((prev) => Math.max(prev, activeStreak));
        // setBestActiveStreak((prev) => console.log(prev, activeStreak));
    }, [activeStreak]);

    useEffect(() => {
        fetchUserInfo();
        fetchHabitInfo();
        getQuote();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <NavBar />
                    <div className="dashboard-container ml-68 pl-12 pr-22 py-6 bg-[#f6f2ec]">
                        <div className="dashboard-header flex items-center justify-between">
                            <div className="dashboard-greeting">
                                <h1 className="text-5xl font-semibold">
                                    {/* Hey {user?.name}, */}
                                    Hey {user?.name?.split(" ")[0]},
                                </h1>
                                <h3 className="mt-2 font-medium">
                                    {new Date().toLocaleDateString("en-IN", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        // year: "numeric",
                                    })}
                                </h3>
                            </div>
                            <div className="dashboard-actions flex gap-4">
                                <button
                                    className="flex py-2 items-center gap-2 text-md rounded-xl font-semibold px-4 bg-white"
                                    onClick={() =>
                                        setSuggestNewHabitModel(true)
                                    }
                                    // onClick={getRecommendation}
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
                                handleSaveEditHabit={handleSaveEditHabit}
                                modeldata={modeldata}
                            />
                        )}
                        {suggestNewHabitModel && (
                            <SuggestNewHabitModel
                                setSuggestNewHabitModel={
                                    setSuggestNewHabitModel
                                }
                                setRecommendation={setRecommendation}
                                recommendation={recommendation}
                                habitdata={habitdata}
                                setHabitdata={setHabitdata}
                            />
                        )}

                        {message1 && (
                            <div className="morning-message bg-yellow-200 flex items-center gap-4 py-2 px-4 mt-8 relative rounded-2xl">
                                <div className="bg-amber-500 rounded-xl p-1">
                                    <RiSunLine size={30} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Welcome, {user?.name}
                                    </h2>
                                    {motivation ? (
                                        <p className="text-md font-semibold">
                                            {motivation}
                                        </p>
                                    ) : (
                                        <p className="text-md font-semibold">
                                            Thinking of Something Nice to say...
                                        </p>
                                    )}
                                </div>
                                <RxCross2
                                    onClick={() => setMessage1(false)}
                                    size={30}
                                    className="hover:cursor-pointer absolute top-2 right-2"
                                />
                            </div>
                        )}
                        {message2 && (
                            <div className="streak-warning-card bg-[#FFD2E0]  relative rounded-2xl mt-8  pt-2 pb-6">
                                <div className="flex items-center gap-4  px-4 ">
                                    <div className="bg-[#FF0883] rounded-xl p-1">
                                        <FaRegHeart size={30} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            Streak Paused, Side Project-1Hr
                                        </h2>
                                        <p className="text-md font-semibold">
                                            You have A Great track, Breaking
                                            Streak are Part of Your Journey
                                        </p>
                                    </div>
                                    <RxCross2
                                        onClick={() => setMessage2(false)}
                                        size={30}
                                        className="hover:cursor-pointer absolute top-2 right-2"
                                    />
                                </div>

                                {!days ? (
                                    <button
                                        className="cursor-pointer bg-amber-400 ml-18 text-xl rounded-xl px-4 py-1 mt-2 text-white"
                                        onClick={threeDayPlan}
                                    >
                                        {loadingPara ? (
                                            <p className="opacity-75">
                                                Loading...
                                            </p>
                                        ) : (
                                            <p>Go Back on Track</p>
                                        )}
                                    </button>
                                ) : (
                                    <div className="ml-18 mr-10 mt-2 bg-white rounded-lg p-4 font-semibold">
                                        {days.split(".").map((ele, idx) => (
                                            <p key={idx}>{ele}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="stats-grid grid grid-cols-4 gap-8 mt-8">
                            <div className="stats-card bg-white rounded-xl flex gap-4 items-center px-4 py-4">
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
                            <div className="stats-card bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                                <FaGripfire
                                    size={45}
                                    className="border-2 rounded bg-amber-100 border-amber-300 p-1"
                                />
                                <div>
                                    <h2 className="text-gray-400 text-lg">
                                        Active Streak
                                    </h2>
                                    <h2 className="text-xl font-semibold">
                                        {activeStreak}
                                    </h2>
                                </div>
                            </div>
                            <div className="stats-card bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                                <FaTrophy
                                    size={45}
                                    className="border-2 rounded bg-[#FDE5F2] border-[#F7AFBA] p-1"
                                />
                                <div>
                                    <h2 className="text-gray-400 text-lg">
                                        Best Streak
                                    </h2>
                                    <h2 className="text-xl font-semibold">
                                        {bestActiveStreak}
                                    </h2>
                                </div>
                            </div>
                            <div className="stats-card bg-white rounded-xl flex gap-4 items-center px-4 py-4">
                                <IoIosTrendingUp
                                    size={45}
                                    className="border-2 bg-green-100 rounded border-green-300 p-1"
                                />
                                <div>
                                    <h2 className="text-gray-400 text-lg">
                                        This Week
                                    </h2>
                                    <h2 className="text-xl font-semibold">
                                        {weeklyPercentage} %
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="habits-section min-h-48 bg-white mt-12 pb-4 rounded-3xl">
                            <HabitsList
                                habitdata={habitdata}
                                setHabitdata={setHabitdata}
                                setModeldata={setModeldata}
                                modeldata={modeldata}
                            />
                        </div>

                        <div
                            className="weekly-report-section bg-blue-100  py-2 px-4 mt-8 relative transition-all rounded-2xl"
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
                                        See patterns and personalised
                                        encouragement from the past 7 days
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
                                <div>
                                    <button
                                        className="bg-amber-300 py-1 px-4 rounded-xl text-lg mt-2 text-white hover:opacity-70 transition-all hover:cursor-pointer"
                                        onClick={weeklyreport}
                                        disabled={loadingPara}
                                    >
                                        {loadingPara ? (
                                            <p className="opacity-85">
                                                Loading...
                                            </p>
                                        ) : (
                                            <p>Generate A Weekly Report </p>
                                        )}
                                    </button>
                                    <p className="font-semibold whitespace-pre-line`">
                                        {report}
                                    </p>
                                </div>
                            )}
                        </div>
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

export default Dashboard;
