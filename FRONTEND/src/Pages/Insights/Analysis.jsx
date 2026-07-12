import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { IoIosTrendingUp } from "react-icons/io";

const DAYS_BACK = 14;

const Analysis = ({ habitdata = [] }) => {
    // Build a map of the last 14 days -> completion count

    console.log(habitdata);
    

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateBuckets = [];
    for (let i = DAYS_BACK - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dateBuckets.push({
            key: d.toDateString(),
            label: d.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            count: 0,
        });
    }

    const bucketMap = Object.fromEntries(dateBuckets.map((b) => [b.key, b]));

    habitdata.forEach((habit) => {
        (habit.completedDates || []).forEach((date) => {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            const key = d.toDateString();
            if (bucketMap[key]) {
                bucketMap[key].count += 1;
            }
        });
    });

    const data = dateBuckets.map((b) => ({
        label: b.label,
        completions: b.count,
    }));

    const hasData = data.some((d) => d.completions > 0);

    return (
        <div className="bg-white rounded-xl px-4 py-4 h-full">
            <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                <IoIosTrendingUp />
                14-Day Trend
            </p>

            {!hasData ? (
                <div className="flex items-center justify-center h-48 text-sm text-gray-400">
                    No completions logged yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart
                        data={data}
                        margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="trendFill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#FF8904"
                                    stopOpacity={0.35}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#FF8904"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#eee"
                        />
                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 10, fill: "#6b7280" }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                            interval={1}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: 8,
                                border: "1px solid #e5e7eb",
                                fontSize: 13,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="completions"
                            stroke="#FF8904"
                            strokeWidth={2}
                            fill="url(#trendFill)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Analysis;
