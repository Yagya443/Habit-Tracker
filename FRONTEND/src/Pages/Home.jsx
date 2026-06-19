import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    console.log(import.meta.env.VITE_RENDER_URL);

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="min-h-screen bg-[#F5F1EB]">
                <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row items-center justify-between">
                    <div className="max-w-2xl">
                        <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium">
                            🚀 Build Better Habits Daily
                        </span>

                        <h1 className="mt-8 text-6xl font-bold text-gray-900 leading-tight">
                            Transform Small Actions Into
                            <span className="text-orange-500">
                                {" "}
                                Lifelong Habits
                            </span>
                        </h1>

                        <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                            Track your daily habits, maintain streaks, gain
                            powerful insights, and stay consistent on your
                            journey towards becoming your best self.
                        </p>

                        <div className="mt-10 ">
                            <button
                                onClick={() => navigate("/login")}
                                className="hover:cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
                            >
                                Start Tracking
                            </button>
                        </div>

                        <div className="mt-12 flex gap-10">
                            <div>
                                <h2 className="text-3xl text-black  font-bold">
                                    10K+
                                </h2>
                                <p className="text-gray-500">Habits Created</p>
                            </div>

                            <div>
                                <h2 className="text-3xl  text-black font-bold">
                                    85%
                                </h2>
                                <p className="text-gray-500">Completion Rate</p>
                            </div>

                            <div>
                                <h2 className="text-3xl text-black  font-bold">
                                    500+
                                </h2>
                                <p className="text-gray-500">Active Users</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 lg:mt-0">
                        {/*  */}
                        {/*  */}
                        {/*  */}
                        {/*  */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
