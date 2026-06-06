const Habit = require("../models/Habit.model");

const createHabit = async (req, res) => {
    try {
        const { userId, title, description, category, icon, color, completed } =
            req.body;

        const habit = new Habit({
            userId: req.user._id,
            title,
            description,
            category,
            icon,
            color,
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

const archiveHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found",
            });
        }

        habit.archived = !habit.archived;

        await habit.save();

        res.status(200).json(habit);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const increseStreak = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found",
            });
        }

        habit.streak=habit.streak+1
        habit.maxStreak=Math.max(habit.streak+1,habit.maxStreak)

        await habit.save();

        res.status(200).json(habit);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createHabit,
    getHabit,
    editHabit,
    deleteHabit,
    archiveHabit,
    increseStreak
};
