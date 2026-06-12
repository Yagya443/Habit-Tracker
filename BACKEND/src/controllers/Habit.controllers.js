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

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        allHabits.forEach((habit) => {

            if (habit.lastCompletedDate) {
                const lastDate = new Date(habit.lastCompletedDate);
                lastDate.setHours(0, 0, 0, 0);

                const diffDays = Math.floor(
                    (today - lastDate) / (1000 * 60 * 60 * 24),
                );

                if (diffDays > 1) {
                    habit.streak = 0;
                }
            }
        });

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

const completeHabit = async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        return res.status(404).json({
            message: "Habit not found",
        });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastDate = habit.lastCompletedDate
        ? new Date(habit.lastCompletedDate)
        : null;

    if (lastDate) {
        lastDate.setHours(0, 0, 0, 0);

        if (lastDate.getTime() !== yesterday.getTime()) {
            habit.streak = 0;
        }
    }

    if (lastDate && lastDate.getTime() === today.getTime()) {
        return res.status(400).json({
            message: "Already completed today",
        });
    }

    habit.streak += 1;
    habit.maxStreak = Math.max(habit.maxStreak, habit.streak);

    habit.lastCompletedDate = today;
    habit.completedDates.push(today);
    habit.completed = true;

    await habit.save();

    res.status(200).json(habit);
};

module.exports = {
    createHabit,
    getHabit,
    editHabit,
    deleteHabit,
    archiveHabit,
    completeHabit,
};
