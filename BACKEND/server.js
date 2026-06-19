const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRoutes = require("./src/routes/User.routes.js");
const habitRoutes = require("./src/routes/Habit.routes.js");
const aiRoutes = require("./src/routes/AI.routes.js");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/habit", habitRoutes);
app.use("/ai", aiRoutes);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(import.meta.env.MONGO_SRV);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
    }
};
connectDB();

const PORT = import.meta.env.PORT || 3000;
// console.log(import.meta.env.OPENAI_API_KEY);
app.listen(PORT, () => {
    console.log(`App is Listening at ${PORT}`);
});
