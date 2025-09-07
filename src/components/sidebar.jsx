"use client";
import React from "react";
import { Droplets, Home, BarChart2, AlertCircle, Settings } from "lucide-react";

export default function Sidebar({ selectedPage, setSelectedPage }) {
    const menuItems = [
        { name: "Overview", icon: Home },
        { name: "Forecast", icon: BarChart2 },
        { name: "Alerts", icon: AlertCircle },
        { name: "Settings", icon: Settings },
    ];

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="flex items-center gap-2 p-6 border-b border-gray-700">
                <Droplets className="w-6 h-6 text-blue-400" />
                <span className="text-2xl font-bold">HydroSync_AI</span>
            </div>

            <nav className="flex-1 mt-6">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setSelectedPage(item.name)}
                        className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition-colors ${selectedPage === item.name ? "bg-gray-700" : ""
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-700">
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                    Logout
                </button>
            </div>
        </div>
    );
}
