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
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/habits"
                    element={
                        <ProtectedRoute>
                            <Habits />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/Insights"
                    element={
                        <ProtectedRoute>
                            <Insights />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/weekly"
                    element={
                        <ProtectedRoute>
                            <Weekly />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/statistics"
                    element={
                        <ProtectedRoute>
                            <Statistics />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
