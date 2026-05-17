const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        avatar: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
