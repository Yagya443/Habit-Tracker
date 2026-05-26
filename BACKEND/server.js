const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./src/routes/User.routes.js");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.SRV);
    console.log("MongoDB Connected");
};
connectDB();

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`App is Listening at ${PORT}`);
});
