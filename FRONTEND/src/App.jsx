import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Insights from "./Pages/Insights/Insights";
import Habits from "./Pages/Habits/Habits";
import Weekly from "./Pages/Weekly/Weekly";
import Statistics from "./Pages/Statistics/Statistics";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/Insights" element={<Insights />} />
                <Route path="/weekly" element={<Weekly />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </>
    );
}

export default App;
