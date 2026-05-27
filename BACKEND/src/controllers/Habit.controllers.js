const Habit = require("../models/Habit.model");

const createHabit = async (req, res) => {
    try {
        const { userId, title, description, category, icon, colour } = req.body;

        const habit = new Habit({
            userId: req.user._id,
            title,
            description,
            category,
            icon,
            colour,
        });

        await habit.save();

        res.status(201).json({
            message: "Habit created successfully",
            habit,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getHabit = async (req, res) => {
    try {
        const allHabits = await Habit.find({ userId: req.user._id });

        res.status(200).json(allHabits);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;



        const deleteHabit = await Habit.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!deleteHabit) {
            return res.status(404).json({
                message: "Habit not found",
            });
        }

        res.status(200).json({
            message: "Habit deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const editHabit = async (req, res) => {
    try {
        const { id } = req.params;

        const editHabit = await Habit.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            req.body,
            {
                new: true,
            },
        );

        if (!editHabit) {
            return res.status(404).json({
                message: "Habit not found",
            });
        }

        res.status(200).json({
            message: "Habit updated successfully",
            editHabit,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createHabit, getHabit, editHabit, deleteHabit };
