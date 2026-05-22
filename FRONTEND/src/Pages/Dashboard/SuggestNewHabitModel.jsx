import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SuggestNewHabitModel = ({ setSuggestNewHabitModel }) => {
    const questions = [
        "What are your goal right now?",
        "When are you most productive during the day?",
        "What habits have you struggled with?",
    ];

    const [currQuestion, setCurrQuestion] = useState(0);

    return (
        <div className="absolute -translate-1/2  z-50 left-1/2 top-1/2">
            <div className="bg-white w-112 min-h-[250px] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold ">New Habit</h1>

                    <FaTimes
                        className="cursor-pointer "
                        onClick={() => setSuggestNewHabitModel(false)}
                    />
                </div>

                
                    <p className={`font-light text-xs mt-2 ${currQuestion == 0 ? 'opacity-100' : 'opacity-0' }`}>
                        Answer 3 quick question and I'll suggest you 3
                        personalized habits.
                    </p>
               

                <div className="mt-2">
                    {questions.map((question, idx) => (
                        <label className="text-md font-medium " key={idx}>
                            {currQuestion == idx && question}
                        </label>
                    ))}
                    <input
                        type="text"
                        placeholder="Enter habit..."
                        className="w-full mt-1 border border-gray-300 rounded-xl px-2 py-2 outline-none"
                    />
                </div>

                <div className="flex justify-end items-end gap-3 mt-6">
                    {currQuestion !== 0 && (
                        <button
                            className="px-4 py-2 rounded-lg bg-gray-100 font-medium text-black"
                            onClick={() => setCurrQuestion(currQuestion - 1)}
                        >
                            Back
                        </button>
                    )}

                    {currQuestion !== questions.length - 1 && (
                        <button
                            className="px-4 py-2 rounded-lg bg-orange-400 font-medium text-white"
                            onClick={() => setCurrQuestion(currQuestion + 1)}
                        >
                            Next
                        </button>
                    )}
                    {currQuestion == questions.length - 1 && (
                        <button
                            className="px-4 py-2 rounded-lg bg-orange-400 font-medium text-white"
                            onClick={() => setSuggestNewHabitModel(false)}
                        >
                            Create
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuggestNewHabitModel;
