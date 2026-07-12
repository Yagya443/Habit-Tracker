import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import FilteredHabitList from "./FilteredHabitList";

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

    const fetchHabitInfo = useCallback(async () => {
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
    });

    const handleArchiveHabit = useCallback(async (id) => {
        // setLoading(true);
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
            // setLoading(false);
        }
    });

    const handleSaveEditHabit = useCallback(
        async (id, title, description, category, icon, color) => {
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
                    prev.map((habit) =>
                        habit._id === id ? response.data : habit,
                    ),
                );
            } catch (error) {
                console.log(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        },
    );

    const handleEditHabit = (habit) => {
        setModeldata({
            isOpen: true,
            habit,
            mode: "edit",
        });
    };

    const handleDeleteHabit = useCallback(async (id) => {
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
            setLoading(false);
        }
    });

    const handleCreateHabit = useCallback(
        async (title, description, category, icon, color) => {
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
            } catch (error) {
                console.log(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        },
    );

    const activeCount = useMemo(
        () => habitdata.filter((habit) => !habit.archived).length,
    );

    const archivedCount = useMemo(
        () => habitdata.filter((habit) => habit.archived).length,
    );

    const filteredHabits = useMemo(() =>
        habitdata.filter((habit) => {
            const filterArchive = archivedActive
                ? habit.archived
                : !habit.archived;

            const filterSearch =
                habit.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                habit.description
                    .toLowerCase()
                    .includes(searchVal.toLowerCase()) ||
                "";

            const filterCategory = habit.category === filters || filters === "";

            return filterArchive && filterSearch && filterCategory;
        }),
    );

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
            {!loading ? (
                <>
                    <NavBar />

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
                                    onClick={() =>
                                        setSuggestNewHabitModel(true)
                                    }
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
                                setSuggestNewHabitModel={
                                    setSuggestNewHabitModel
                                }
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
                                <option value="Mindfullness">
                                    Mindfullness
                                </option>
                                <option value="Social">Social</option>
                                <option value="Productivity">
                                    Productivity
                                </option>
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
                            <FilteredHabitList
                                filteredHabits={filteredHabits}
                            />
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

export default Habits;
