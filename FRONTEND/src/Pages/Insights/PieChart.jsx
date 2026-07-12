import React from "react";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { CiTrophy } from "react-icons/ci";

const PALETTE = ["#FF8904", "#3b82f6", "#22c55e", "#a855f7", "#ef4444", "#eab308"];

const PieChart = ({ habitdata = [] }) => {
    const categoryCount = {};

    habitdata.forEach((habit) => {
        const cat = habit.category || "Uncategorized";
        const count = (habit.completedDates || []).length;
        categoryCount[cat] = (categoryCount[cat] || 0) + count;
    });

    const data = Object.entries(categoryCount)
        .map(([name, value]) => ({ name, value }))
        .filter((d) => d.value > 0);

    const hasData = data.length > 0;

    return (
        <div className="bg-white rounded-xl px-4 py-4 h-full">
            <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                <CiTrophy />
                Completions by Category
            </p>

            {!hasData ? (
                <div className="flex items-center justify-center h-48 text-sm text-gray-400">
                    No completions logged yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={220}>
                    <RePieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                            paddingAngle={2}
                            label={({ percent }) =>
                                `${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={PALETTE[index % PALETTE.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                                fontSize: 13,
                            }}
                        />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ fontSize: 12 }}
                        />
                    </RePieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default PieChart;