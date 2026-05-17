const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors())

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.SRV);
    console.log("MongoDB Connected");
};
connectDB();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is Listening at ${PORT}`);
});

