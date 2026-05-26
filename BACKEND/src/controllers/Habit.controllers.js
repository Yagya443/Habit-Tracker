const Habit = require("../models/Habit.model");

const createHabit = async (req, res) => {
    try {
        const { userId, title, description, category, icon, colour } = req.body;

        const habit = new Habit({
            userId:req.user.id,
            title,
            description,
            category,
            icon,
            colour,
        });

        await habit.save()

        res.status(201).json({
            message: "Habit created successfully",
            habit,
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createHabit };