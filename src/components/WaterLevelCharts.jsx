"use client";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function WaterLevelChart({ waterLogs }) {
    if (!waterLogs || waterLogs.length === 0) {
        return <p className="text-gray-500">No water level data available</p>;
    }

    const data = {
        labels: waterLogs.map((log) =>
            new Date(log.date).toLocaleDateString()
        ),
        datasets: [
            {
                label: "Water Level (%)",
                data: waterLogs.map((log) => log.water_level_percentage.toFixed(2)),
                fill: true,
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 1)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Water Level Over Time" },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: "Water Level (%)" },
            },
            x: {
                title: { display: true, text: "Date" },
            },
        },
    };

    return <Line data={data} options={options} />;
}
