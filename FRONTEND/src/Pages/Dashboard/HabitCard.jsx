import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdDone } from "react-icons/md";

const HabitCard = React.memo(function HabitCard({
    habit,
    // isMenuOpen,
    // onToggleMenu,
    onComplete,
    onDelete,
    onEdit,
    // menuRef,
    handleCompletedDate,
}) {
    const [openMenu, setOpenMenu] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isCompletedToday = handleCompletedDate(habit.lastCompletedDate);

    return (
        <div
            key={habit._id}
            className={`habit-card rounded-xl mx-4 px-4 flex items-center justify-between py-2 ${
                handleCompletedDate(habit.lastCompletedDate)
                    ? "bg-amber-50"
                    : "bg-amber-100"
            }`}
        >
            <div className="habit-info-section flex items-center gap-6">
                <div
                    className={`habit-icon-container rounded p-1 text-2xl `}
                    style={{ backgroundColor: habit.color }}
                >
                    {habit.icon}
                </div>
                <div className="habit-details flex flex-col">
                    <div className="habit-header flex items-center gap-4">
                        <h1 className="text-xl">{habit.title}</h1>
                        <p className="bg-gray-300 rounded-2xl px-2">
                            {habit.category}
                        </p>
                    </div>
                    <p className="font-light">{habit.description}</p>
                </div>
            </div>

            <div className="habit-actions flex items-center gap-6">
                <div className="habit-streak flex items-center">
                    <AiOutlineFire fill="oklch(76.9% 0.188 70.08)" size={25} />
                    {habit.streak}
                </div>
                <BsThreeDots
                    size={30}
                    className="threeDotBtn cursor-pointer"
                    onClick={() => setOpenMenu(habit._id)}
                />
                <MdDone
                    fill="#fff"
                    className="habit-complete-btn bg-amber-500 rounded-full p-1 hover:bg-amber-400 cursor-pointer transition duration-200"
                    size={50}
                    onClick={() => onComplete(habit._id)}
                />
            </div>
            {openMenu === habit._id && (
                <div
                    ref={menuRef}
                    className="habit-menu absolute right-48 mb-24  bg-yellow-200 shadow-md rounded px-6 py-2"
                >
                    <div className="habit-menu-arrow absolute -bottom-2 right-3 w-4 h-4 bg-yellow-200 rotate-45"></div>
                    <p
                        className="cursor-pointer font-semibold "
                        onClick={() => onEdit(habit)}
                    >
                        Edit
                    </p>
                    <p
                        className="cursor-pointer font-semibold"
                        onClick={() => onDelete(habit._id)}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    );
});

export default HabitCard;
