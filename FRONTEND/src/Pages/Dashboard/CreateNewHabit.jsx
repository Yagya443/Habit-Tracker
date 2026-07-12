import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CreateNewHabit = ({
    setModeldata,
    handleCreateHabit,
    handleSaveEditHabit,
    modeldata,
}) => {

    
    const emojis = [
        "💪",
        "❤️",
        "📚",
        "🧘",
        "🫂",
        "⚡",
        "💰",
        "🎨",
        "✈️",
        "🍎",
        "🎵",
        "🌟",
    ];

    const colors = [
        "#f59e0b",
        "#ef4444",
        "#3b82f6",
        "#22c55e",
        "#a855f7",
        "#ec4899",
    ];

    const [title, setTitle] = useState(modeldata?.habit?.title || "");
    const [description, setDescription] = useState(
        modeldata?.habit?.description || "",
    );
    const [category, setCategory] = useState(
        modeldata?.habit?.category || "Fitness",
    );
    const [icon, setIcon] = useState(modeldata?.habit?.icon || "");
    const [color, setColor] = useState(modeldata?.habit?.color || "");

    return (
        <div className="fixed -translate-1/2  z-50 left-1/2 top-1/2">
            <div className="bg-white w-md rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold ">
                        {modeldata.mode === "edit" ? "Edit Habit" : "New Habit"}
                    </h1>

                    <FaTimes
                        className="cursor-pointer "
                        onClick={() =>
                            setModeldata({
                                isOpen: false,
                                habit: null,
                                mode: "create",
                            })
                        }
                    />
                </div>

                {/* Input */}
                <div className="mt-6">
                    <label className="text-md font-medium ">Habit Name</label>
                    <input
                        type="text"
                        value={title}
                        placeholder="Enter habit..."
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-1 border border-gray-300 rounded-xl px-2 py-2 outline-none"
                    />

                    <label className="text-md font-medium">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What does this habit matter to you?"
                        className="w-full mt-1 border border-gray-300 rounded-xl px-2 py-2 outline-none"
                    />

                    <div className="flex flex-col mt-2">
                        <label className="text-md font-medium ">Category</label>

                        <select
                            className="w-full mt-1 border border-gray-300 rounded-xl px-2 py-2 outline-none"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
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
                    </div>
                </div>

                <div className="mt-2">
                    <h1 className="text-md font-medium">Icon</h1>
                    <div className="flex flex-wrap gap-2 bg-white ">
                        {emojis.map((emoji, idx) => (
                            <div
                                key={idx}
                                onClick={() => setIcon(emoji)}
                                className={`border-2 rounded p-1 text-xl hover:border-amber-500 hover:-translate-y-1 hover:bg-amber-50 cursor-pointer transition ${emoji===icon && 'bg-amber-50 border-amber-500' }`}
                            >
                                {emoji}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <h1 className="text-md font-medium">Colours</h1>
                    <div className="flex flex-wrap gap-2 bg-white ">
                        {colors.map((colors, idx) => (
                            <div
                                key={idx}
                                onClick={() => setColor(colors)}
                                className={`h-8 w-8 rounded-full hover:-translate-y-1 cursor-pointer transition  ${colors===color && 'border-2 border-black ' } `}
                                style={{ backgroundColor: colors }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        className="px-4 py-2 rounded-lg bg-orange-400 font-medium text-white"
                        onClick={() => {
                            if (modeldata.mode == "edit") {
                                handleSaveEditHabit(
                                    modeldata.habit._id,
                                    title,
                                    description,
                                    category,
                                    icon,
                                    color,
                                );
                            } else {
                                handleCreateHabit(
                                    title,
                                    description,
                                    category,
                                    icon,
                                    color,
                                );
                            }

                            setModeldata({
                                isOpen: false,
                                habit: null,
                                mode: "create",
                            });
                        }}
                    >
                        {modeldata.mode === "edit" ? "Update" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewHabit;
