import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; // shadcn/ui
import { AlertCircle, Droplets, CloudRain, TrendingUp } from "lucide-react";

export default function Dashboard() {
    const dam = {
        name: "Kalyani Dam",
        capacity: 420,
        level: 278,
        percentage: 66,
        status: "Stable",
        inflow: 85,
        outflow: 62,
    };

    const forecast = [
        { date: "2025-09-01", level: 281, rain: 10, risk: "Low risk" },
        { date: "2025-09-02", level: 284, rain: 14, risk: "Low risk" },
        { date: "2025-09-03", level: 288, rain: 22, risk: "Medium risk" },
        { date: "2025-09-04", level: 293, rain: 26, risk: "Medium risk" },
        { date: "2025-09-05", level: 300, rain: 32, risk: "High risk" },
    ];

    const alerts = [
        {
            dam: "Bhavani Sagar",
            time: "10m ago",
            message: "Outflow exceeds inflow for 6h. Review irrigation schedules.",
            type: "warning",
        },
        {
            dam: "Mettur Dam",
            time: "1h ago",
            message: "Rainfall spike detected in catchment. Monitoring runoff.",
            type: "info",
        },
        {
            dam: "Kalyani Dam",
            time: "3h ago",
            message: "Predicted level > 95% capacity in 72h if rainfall persists.",
            type: "danger",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Droplets className="w-6 h-6 text-blue-600" />
                HydroSync_AI Overview
            </h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Dam</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">{dam.name}</p>
                        <p className="text-3xl font-bold text-blue-600">{dam.percentage}%</p>
                        <p className="text-sm text-gray-500">
                            {dam.level} / {dam.capacity} Mm³
                        </p>
                        <p className="text-green-600 font-medium">Status: {dam.status}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg">
                            Medium risk
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                            Elevated level/flow delta
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Flow</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between">
                        <div>
                            <p className="text-gray-500">Inflow</p>
                            <p className="text-lg font-bold">{dam.inflow} m³/s</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Outflow</p>
                            <p className="text-lg font-bold">{dam.outflow} m³/s</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Rainfall Chart Placeholder */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Rainfall (mm)</h2>
                <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    📊 Rainfall Chart (replace with chart library)
                </div>
            </div>

            {/* Forecast */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {forecast.map((f, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <p className="text-gray-600">{f.date}</p>
                                <p className="text-sm">
                                    Level: <span className="font-bold">{f.level} Mm³</span>
                                </p>
                                <p className="text-sm">
                                    Rain: <span className="font-bold">{f.rain} mm</span>
                                </p>
                                <p
                                    className={`text-sm font-medium mt-1 ${f.risk === "Low risk"
                                        ? "text-green-600"
                                        : f.risk === "Medium risk"
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {f.risk}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Alerts */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Alerts</h2>
                <div className="space-y-4">
                    {alerts.map((a, i) => (
                        <Card
                            key={i}
                            className={`border-l-4 ${a.type === "warning"
                                ? "border-yellow-500"
                                : a.type === "info"
                                    ? "border-blue-500"
                                    : "border-red-500"
                                }`}
                        >
                            <CardContent className="p-4 flex justify-between">
                                <div>
                                    <p className="font-semibold">{a.dam}</p>
                                    <p className="text-gray-600">{a.message}</p>
                                    <p className="text-sm text-gray-400">{a.time}</p>
                                </div>
                                <button className="text-blue-600 hover:underline">
                                    Acknowledge
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
