import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { FaGripfire } from "react-icons/fa";

const truncate = (str = "", n = 10) =>
    str.length > n ? str.slice(0, n) + "…" : str;

const BarGraph2 = ({ habitdata = [] }) => {
    const data = habitdata.map((habit) => ({
        name: truncate(habit.title),
        streak: habit.streak || 0,
        maxStreak: habit.maxStreak || 0,
    }));

    const hasData = data.length > 0;

    return (
        <div className="bg-white rounded-xl px-4 py-4 h-full">
            <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                <FaGripfire />
                Streak vs Best Streak
            </p>

            {!hasData ? (
                <div className="flex items-center justify-center h-48 text-sm text-gray-400">
                    No habits yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                        data={data}
                        margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#eee"
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11, fill: "#6b7280" }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: "#f6f2ec" }}
                            contentStyle={{
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                                fontSize: 13,
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: 12 }}
                            formatter={(value) =>
                                value === "streak" ? "Current" : "Best"
                            }
                        />
                        <Bar
                            dataKey="streak"
                            fill="#FF8904"
                            radius={[6, 6, 0, 0]}
                        />
                        <Bar
                            dataKey="maxStreak"
                            fill="#3b82f6"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default BarGraph2;
