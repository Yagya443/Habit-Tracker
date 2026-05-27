const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Fitness",
                "Health",
                "Learning",
                "Mindfullness",
                "Social",
                "Productivity",
                "Finance",
                "Creativity",
                "Other",
            ],
        },
        icon: {
            type: String,
            required: true,
            enum: [
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
            ],
        },
        colour: {
            type: String,
            required: true,
            enum: [
                "#f59e0b",
                "#ef4444",
                "#3b82f6",
                "#22c55e",
                "#a855f7",
                "#ec4899",
            ],
        },
        streak: {
            type: Number,
            default: 0,
        },
        archived: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Habit", habitSchema);  