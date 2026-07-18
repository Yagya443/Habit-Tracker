import React from "react";
import { AiOutlineFire } from "react-icons/ai";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import { CiTrophy } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const FilteredHabitList = React.memo(function FilteredHabitList({
    filteredHabits,
    handleSaveEditHabit,
    handleArchiveHabit,
    handleEditHabit,
    handleDeleteHabit,
}) {
    return (
        <>
            {filteredHabits.map((habit, idx) => (
                <div
                    key={idx}
                    className="habit-card rounded-xl mx-4 px-4 flex items-center justify-between bg-white py-2"
                >
                    <div className="habit-info flex items-center gap-6">
                        <div
                            className={`habit-icon rounded p-1 text-2xl`}
                            style={{
                                backgroundColor: habit.color,
                            }}
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
                                onClick={() => handleArchiveHabit(habit._id)}
                            />
                        ) : (
                            <BiSolidArchiveIn
                                className="habit-archive-btn cursor-pointer"
                                size={25}
                                onClick={() => handleArchiveHabit(habit._id)}
                            />
                        )}

                        <MdDeleteOutline
                            fill="#fff"
                            className="habit-delete-btn bg-red-500 rounded-full p-1"
                            size={40}
                            onClick={() => handleDeleteHabit(habit._id)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
});

export default FilteredHabitList;
