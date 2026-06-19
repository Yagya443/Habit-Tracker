import React from "react";
import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SuggestNewHabitModel = ({
    setSuggestNewHabitModel,
    recommendation,
    setRecommendation,
    setHabitdata,
    habitdata,
}) => {
    const questions = [
        {
            question: "What are your goals right now?",
            field: "goal",
        },
        {
            question: "When are you most productive during the day?",
            field: "productiveTime",
        },
        {
            question: "What habits have you struggled with?",
            field: "struggledHabits",
        },
    ];
    // console.log('1',typeof recommendation);

    const [answer, setAnswer] = useState({
        goal: "",
        productiveTime: "",
        struggledHabits: "",
    });

    const getRecommendation = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_RENDER_URL}/ai/recommendations`,
                {
                    answer,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            // setRecommendation(response.data.recommendation);
            // console.log(response.data.recommendation);

            setRecommendation(JSON.parse(response.data.recommendation));
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleAddToHabit = async (idx) => {
        try {
            const token = localStorage.getItem("token");
            // console.log(token);

            // console.log(recommendation[idx]);

            const response = await axios.post(
                `${import.meta.env.VITE_RENDER_URL}/habit/createHabit`,
                {
                    title: recommendation[idx].title,
                    category: recommendation[idx].category,
                    description: recommendation[idx].about,
                    icon: recommendation[idx].icon,
                    color: recommendation[idx].color,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setHabitdata((prev) => [response.data.habit, ...prev]);
            console.log((prev) => [...prev, response.data.habit]);
        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.status);
        }
    };

    // console.log(recommendation)
    // console.log('2',typeof recommendation);

    const [currQuestion, setCurrQuestion] = useState(0);

    return (
        <div className="fixed -translate-1/2  z-50 left-1/2 top-1/2">
            {recommendation.length === 0 ? (
                <div className="bg-white w-md min-h-62.5 rounded-2xl p-6 shadow-xl ">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold ">New Habit</h1>

                        <FaTimes
                            className="cursor-pointer "
                            onClick={() => setSuggestNewHabitModel(false)}
                        />
                    </div>

                    <p
                        className={`font-light text-xs mt-2 ${currQuestion == 0 ? "opacity-100" : "opacity-0"}`}
                    >
                        Answer 3 quick question and I'll suggest you 3
                        personalized habits.
                    </p>

                    <div className="mt-2">
                        {questions.map((que, idx) => (
                            <label className="text-md font-medium " key={idx}>
                                {currQuestion == idx && que.question}
                            </label>
                        ))}
                        <input
                            type="text"
                            placeholder=""
                            className="w-full mt-1 border border-gray-300 rounded-xl px-2 py-2 outline-none"
                            value={answer[questions[currQuestion].field]}
                            onChange={(e) =>
                                setAnswer((prev) => ({
                                    ...prev,
                                    [questions[currQuestion].field]:
                                        e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="flex justify-end items-end gap-3 mt-6">
                        {currQuestion !== 0 && (
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-100 font-medium text-black"
                                onClick={() =>
                                    setCurrQuestion(currQuestion - 1)
                                }
                            >
                                Back
                            </button>
                        )}

                        {currQuestion !== questions.length - 1 && (
                            <button
                                className="px-4 py-2 rounded-lg bg-orange-400 font-medium text-white"
                                onClick={() =>
                                    setCurrQuestion(currQuestion + 1)
                                }
                            >
                                Next
                            </button>
                        )}
                        {currQuestion == questions.length - 1 && (
                            <button
                                className="px-4 py-2 rounded-lg bg-orange-400 font-medium text-white"
                                onClick={() => {
                                    // setSuggestNewHabitModel(false);
                                    getRecommendation();
                                }}
                            >
                                Create
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white w-md min-h-62.5 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Recommended Habits
                        </h1>

                        <FaTimes
                            className="cursor-pointer"
                            onClick={() => {
                                setSuggestNewHabitModel(false);
                                // setRecommendation("");
                            }}
                        />
                    </div>
                    <div className="mt-4 max-h-[50vh] overflow-y-scroll scrollbar-none">
                        {recommendation.map((habit, idx) => (
                            <div
                                key={idx}
                                className="border relative rounded-xl p-3 mb-3"
                            >
                                <h2 className=" text-[18px] font-semibold">
                                    {habit.title}
                                </h2>

                                <p className="text-[12px] text-gray-600">
                                    {habit.about}
                                </p>

                                <span className="text-[12px] bg-orange-100 px-2 py-1 mt-1 rounded">
                                    {habit.category}
                                </span>

                                <p className="text-[10px] mt-2 mb-8">
                                    {habit.importance}
                                </p>
                                <button
                                    onClick={() => handleAddToHabit(idx)}
                                    className="text-white bg-amber-500 rounded-lg text-[18px] px-4 absolute bottom-2 right-2"
                                >
                                    Add Habit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestNewHabitModel;
