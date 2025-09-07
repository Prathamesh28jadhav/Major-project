"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import WaterLevelChart from "@/components/WaterLevelCharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Droplets } from "lucide-react";

export default function Dashboard() {
    const [dams, setDams] = useState([]);
    const [selectedDam, setSelectedDam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState("Overview");

    useEffect(() => {
        const fetchDams = async () => {
            try {
                const res = await fetch("/api/dams");
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setDams(data.data);
                    setSelectedDam(data.data[0]);
                }
            } catch (err) {
                console.error("Error fetching dams:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDams();
    }, []);

    if (loading) return <p className="p-6">Loading dashboard...</p>;
    if (!selectedDam) return <p className="p-6">No dam data available.</p>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage}
                className="w-64 min-h-screen bg-white shadow-md fixed left-0 top-0"
            />

            {/* Main Content */}
            <div className="flex-1  p-6 overflow-auto max-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Droplets className="w-6 h-6 text-blue-600" />
                        HydroSync_AI Dashboard
                    </h1>

                    <Select
                        onValueChange={(value) =>
                            setSelectedDam(dams.find((d) => d.name === value))
                        }
                        defaultValue={selectedDam?.name}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Dam" />
                        </SelectTrigger>
                        <SelectContent>
                            {dams.map((d) => (
                                <SelectItem key={d._id} value={d.name}>
                                    {d.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Render only Overview section with all dashboard components */}
                {selectedPage === "Overview" && (
                    <>
                        {/* Top Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Selected Dam</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">{selectedDam.name}</p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {selectedDam.water_level_percentage.toFixed(2)}%
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {selectedDam.gross_storage_capacity_1000m3 * 1000} Mm³
                                    </p>
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
                                        <p className="text-lg font-bold">{selectedDam.inflow} m³/s</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Outflow</p>
                                        <p className="text-lg font-bold">{selectedDam.outflow} m³/s</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Rainfall Chart */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Water Level (%) Over Time</h2>
                            <WaterLevelChart waterLogs={selectedDam.waterLogs} />
                        </div>

                        {/* 5-Day Forecast */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {selectedDam.waterLogs.slice(-5).map((f, i) => {
                                    let risk = "Low risk";
                                    if (f.water_level_percentage > 70) risk = "Medium risk";
                                    if (f.water_level_percentage > 90) risk = "High risk";

                                    return (
                                        <Card key={f._id || i}>
                                            <CardContent className="p-4">
                                                <p className="text-gray-600">
                                                    {new Date(f.date).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm">
                                                    Level:{" "}
                                                    <span className="font-bold">
                                                        {f.water_level_percentage.toFixed(2)}%
                                                    </span>
                                                </p>
                                                <p className="text-sm">
                                                    Rain: <span className="font-bold">{f.rainfall_mm} mm</span>
                                                </p>
                                                <p
                                                    className={`text-sm font-medium mt-1 ${risk === "Low risk"
                                                        ? "text-green-600"
                                                        : risk === "Medium risk"
                                                            ? "text-yellow-600"
                                                            : "text-red-600"
                                                        }`}
                                                >
                                                    {risk}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Alerts */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Alerts</h2>
                            <div className="space-y-4">
                                {/* Sample alerts */}
                                {[{
                                    dam: "Bhavani Sagar",
                                    time: "10m ago",
                                    message: "Outflow exceeds inflow for 6h. Review irrigation schedules.",
                                    type: "warning",
                                }, {
                                    dam: "Mettur Dam",
                                    time: "1h ago",
                                    message: "Rainfall spike detected in catchment. Monitoring runoff.",
                                    type: "info",
                                }, {
                                    dam: "Kalyani Dam",
                                    time: "3h ago",
                                    message: "Predicted level > 95% capacity in 72h if rainfall persists.",
                                    type: "danger",
                                }].map((a, i) => (
                                    <Card key={i} className={`border-l-4 ${a.type === "warning"
                                        ? "border-yellow-500"
                                        : a.type === "info"
                                            ? "border-blue-500"
                                            : "border-red-500"
                                        }`}>
                                        <CardContent className="p-4 flex justify-between">
                                            <div>
                                                <p className="font-semibold">{a.dam}</p>
                                                <p className="text-gray-600">{a.message}</p>
                                                <p className="text-sm text-gray-400">{a.time}</p>
                                            </div>
                                            <button className="text-blue-600 hover:underline">Acknowledge</button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Empty sections for other sidebar pages */}
                {selectedPage !== "Overview" && (
                    <p className="text-gray-500 text-center mt-20">Content coming soon...</p>
                )}
            </div>
        </div>
    );
}