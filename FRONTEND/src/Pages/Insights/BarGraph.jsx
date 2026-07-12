import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { TbActivityHeartbeat } from "react-icons/tb";

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BarGraph = ({ habitdata = [] }) => {
    // Count completions per day of week across all habits
    const dayCount = DAY_ORDER.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
    }, {});

    habitdata.forEach((habit) => {
        (habit.completedDates || []).forEach((date) => {
            const day = new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
            });
            if (dayCount[day] !== undefined) {
                dayCount[day] += 1;
            }
        });
    });

    const data = DAY_ORDER.map((day) => ({
        day,
        completions: dayCount[day],
    }));

    const maxVal = Math.max(...data.map((d) => d.completions), 0);
    const hasData = maxVal > 0;

    return (
        <div className="bg-white rounded-xl px-4 py-4 h-full">
            <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                <TbActivityHeartbeat />
                Completions by Day
            </p>

            {!hasData ? (
                <div className="flex items-center justify-center h-48 text-sm text-gray-400">
                    No completions logged yet
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
                            dataKey="day"
                            tick={{ fontSize: 12, fill: "#6b7280" }}
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
                        <Bar dataKey="completions" radius={[6, 6, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        entry.completions === maxVal
                                            ? "#FF8904"
                                            : "#fdd9a8"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default BarGraph;
