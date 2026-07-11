import React, { useEffect, useState } from "react";
import { BsStars, BsThreeDots } from "react-icons/bs";
import { FaArchive, FaFire, FaPlus } from "react-icons/fa";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import NavBar from "../../Components/NavBar";
import { MdDone } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import CreateNewHabit from "../Dashboard/CreateNewHabit";
import SuggestNewHabitModel from "../Dashboard/SuggestNewHabitModel";
import axios from "axios";

const Habits = () => {
    // const [openNewHabitModel, setOpenNewHabitModel] = useState(false);
    const [suggestNewHabitModel, setSuggestNewHabitModel] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [habitdata, setHabitdata] = useState([]);
    const [filters, setFilters] = useState("");
    const [createHabit, setCreateHabit] = useState([]);
    const [modeldata, setModeldata] = useState({
        isOpen: false,
        mode: "create",
        habit: null,
    });
    const [archivedActive, setArchivedActive] = useState(false);
    const [recommendation, setRecommendation] = useState([]);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);

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
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleArchiveHabit = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `${import.meta.env.VITE_RENDER_URL}/habit/archiveHabit/${id}`,
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
                mode: "create",
            });

            setHabitdata((prev) =>
                prev.map((habit) => (habit._id === id ? response.data : habit)),
            );
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditHabit = (habit) => {
        setModeldata({
            isOpen: true,
            habit,
            mode: "edit",
        });
    };

    const handleDeleteHabit = async (id) => {
        setLoading(true);
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
        } finally {
            setLoading(true);
        }
    };

    async function handleCreateHabit(
        title,
        description,
        category,
        icon,
        color,
    ) {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "${import.meta.env.VITE_RENDER_URL}/habit/createHabit",
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
        } finally {
            setLoading(false);
        }
    }

    const activeCount = habitdata.filter((habit) => !habit.archived).length;
    const archivedCount = habitdata.filter((habit) => habit.archived).length;

    const filteredHabits = habitdata.filter((habit) => {
        const filterArchive = archivedActive ? habit.archived : !habit.archived;

        const filterSearch =
            habit.title.toLowerCase().includes(searchVal.toLowerCase()) ||
            habit.description.toLowerCase().includes(searchVal.toLowerCase()) ||
            "";

        const filterCategory = habit.category === filters || filters === "";

        return filterArchive && filterSearch && filterCategory;
    });

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

    useEffect(() => {
        fetchHabitInfo();
        fetchUserInfo();
    }, []);

    // useEffect(() => {
    //     filteredHabits;
    // }, [habitdata]);

    return (
        <>
            <NavBar />
            {!loading ? (
                <p className="flex items-center justify-center h-screen text-xl font-semibold text-blue-600">
                    Loading...
                </p>
            ) : (
                <div className="habits-page ml-68 pl-12 pr-22 pt-6 bg-[#f6f2ec] ">
                    <div className="habits-header flex items-center justify-between">
                        <div className="habits-header-content">
                            <h1 className="text-5xl font-semibold ">
                                Hey {user?.name?.split(" ")[0]},
                            </h1>
                            <h3 className="mt-2">
                                Manage Every habit you've created ever.
                            </h3>
                        </div>
                        <div className="habits-header-actions flex gap-4 habits-page-title">
                            <button
                                className="suggest-habit-btn flex py-2 items-center gap-2 text-md rounded-xl font-semibold px-4 bg-white"
                                onClick={() => setSuggestNewHabitModel(true)}
                            >
                                <BsStars /> Suggest A Habit
                            </button>
                            <button
                                className="new-habit-btn flex py-2 items-center gap-2 text-md rounded-xl font-semibold px-4 bg-amber-500 text-white"
                                // onClick={() => setOpenNewHabitModel(true)}
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
                            setSuggestNewHabitModel={setSuggestNewHabitModel}
                            setRecommendation={setRecommendation}
                            recommendation={recommendation}
                            setHabitdata={setHabitdata}
                            habitdata={habitdata}
                        />
                    )}

                    <div className="habits-toolbar h-12 bg-white mt-12 px-6 rounded-2xl flex items-center justify-between">
                        <input
                            className="habit-search-input w-2/3 px-4 py-1 rounded-md border-2"
                            placeholder="Search Habits..."
                            onChange={(e) => setSearchVal(e.target.value)}
                            value={searchVal}
                        />
                        <select
                            className="habit-category-filter border rounded-md py-1 px-4"
                            name="category"
                            value={filters}
                            onChange={(e) => setFilters(e.target.value)}
                        >
                            <option value="">All category</option>
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
                        <div className="habit-status-toggle flex  gap-2 rounded-xl items-center border">
                            <div
                                className={`active-habits-tab ${!archivedActive && "bg-amber-200 text-amber-600"} rounded-bl-xl rounded-tl-xl px-4 py-1 cursor-pointer`}
                                onClick={() => setArchivedActive(false)}
                            >
                                Active(
                                {activeCount})
                            </div>
                            <div
                                className={`archived-habits-tab px-4 cursor-pointer ${archivedActive && "bg-amber-200 text-amber-600"} rounded-br-xl rounded-tr-xl px-4 py-1`}
                                onClick={() => setArchivedActive(true)}
                            >
                                Archived({archivedCount})
                            </div>
                        </div>
                    </div>

                    <div className="habits-list px-2 flex flex-col gap-2 mt-6 min-h-[70vh]">
                        {filteredHabits.map((habit, idx) => (
                            <div
                                key={idx}
                                className="habit-card rounded-xl mx-4 px-4 flex items-center justify-between bg-white py-2"
                            >
                                <div className="habit-info flex items-center gap-6">
                                    <div
                                        className={`habit-icon rounded p-1 text-2xl`}
                                        style={{ backgroundColor: habit.color }}
                                    >
                                        {habit.icon}
                                    </div>
                                    <div className="habit-details flex flex-col">
                                        <div className="habit-header flex items-center gap-4">
                                            <h1 className=" habit-title habit-headertext-xl">
                                                {habit.title}
                                            </h1>
                                            <p className="habit-category bg-gray-300 rounded-2xl px-2">
                                                {habit.category}
                                            </p>
                                        </div>
                                        <p className="habit-description font-light">
                                            {habit.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="habit-actions flex items-center gap-6">
                                    <div className=" habit-streak flex items-center">
                                        <AiOutlineFire
                                            fill="oklch(76.9% 0.188 70.08)"
                                            size={25}
                                        />
                                        {habit.streak}
                                    </div>
                                    <div className=" habit-best-streak flex items-center">
                                        <CiTrophy
                                            size={30}
                                            fill="oklch(76.9% 0.188 70.08)"
                                        />
                                        {habit.maxStreak}
                                    </div>
                                    <FaPencilAlt
                                        className="habit-edit-btn"
                                        size={20}
                                        onClick={() => handleEditHabit(habit)}
                                    />
                                    {habit.archived ? (
                                        <BiSolidArchiveOut
                                            className="habit-archive-btn cursor-pointer"
                                            size={25}
                                            onClick={() =>
                                                handleArchiveHabit(habit._id)
                                            }
                                        />
                                    ) : (
                                        <BiSolidArchiveIn
                                            className="habit-archive-btn cursor-pointer"
                                            size={25}
                                            onClick={() =>
                                                handleArchiveHabit(habit._id)
                                            }
                                        />
                                    )}

                                    <MdDeleteOutline
                                        fill="#fff"
                                        className="habit-delete-btn bg-red-500 rounded-full p-1"
                                        size={40}
                                        onClick={() =>
                                            handleDeleteHabit(habit._id)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Habits;
