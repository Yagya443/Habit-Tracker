import React from "react";
import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SuggestNewHabitModel = ({
    setSuggestNewHabitModel,
    recommendation,
    setRecommendation,
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

    const [answer, setAnswer] = useState({
        goal: "",
        productiveTime: "",
        struggledHabits: "",
    });

    const getRecommendation = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/ai/recommendations",
                {
                    answer,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setRecommendation(response.data.recommendation);
            console.log(response.data.recommendation);

            // const habits = JSON.parse(response.data.recommendation);

            // setRecommendation(habits);
            // console.log(habits);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    // console.log(recommendation)
    const [currQuestion, setCurrQuestion] = useState(0);

    return (
        <div className="absolute -translate-1/2  z-50 left-1/2 top-1/2">
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
                                setRecommendation("");
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        {recommendation?.map((habit, idx) => (
                            <div
                                key={idx}
                                className="border rounded-xl p-3 mb-3"
                            >
                                <h2 className="font-semibold">{habit.title}</h2>

                                <p className="text-sm text-gray-600">
                                    {habit.about}
                                </p>

                                <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                                    {habit.category}
                                </span>

                                <p className="text-sm mt-2">
                                    {habit.importance}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestNewHabitModel;
