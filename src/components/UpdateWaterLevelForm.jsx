"use client";
import { useState } from "react";

export default function UpdateWaterLevelForm({ dam }) {
    const [rainfall, setRainfall] = useState("");
    const [loading, setLoading] = useState(false);
    const [updatedWL, setUpdatedWL] = useState(dam.water_level_percentage ?? 50);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const rainfall_mm = parseFloat(rainfall);
        const catchment_km2 = dam.catchment_area_km2 || 0;
        const runoff = dam.runoff_coefficient || 0.2;
        const gross_m3 = (dam.gross_storage_capacity_1000m3 || 0) * 1000;

        // Rainfall volume in m³
        const rainfall_volume_m3 = (rainfall_mm / 1000) * (catchment_km2 * 1_000_000) * runoff;

        // Convert to % increase
        const delta_percent = (rainfall_volume_m3 / gross_m3) * 100;

        let newWaterLevel = (updatedWL || 50) + delta_percent;
        if (newWaterLevel > 100) newWaterLevel = 100; // cap at 100%

        try {
            const res = await fetch(`/api/dams/${dam._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    water_level_percentage: newWaterLevel,
                    rainfall_mm,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setUpdatedWL(newWaterLevel);
            } else {
                alert("Error updating water level");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
            setRainfall("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Enter Rainfall (mm)
                </label>
                <input
                    type="number"
                    step="0.1"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                    required
                    className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md"
            >
                {loading ? "Updating..." : "Update Water Level"}
            </button>

            <p className="mt-3 text-lg">
                <strong>Updated Water Level:</strong> {updatedWL.toFixed(2)}%
            </p>
        </form>
    );
}
