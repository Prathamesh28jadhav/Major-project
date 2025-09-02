"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UpdateWaterLevelForm from "@/components/UpdateWaterLevelForm";

export default function DamPage({ params }) {
    const { id } = params;
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [dam, setDam] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check role on mount
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/login"); // non-admins go to login
        } else {
            setUser({ role });
            fetchDam();
        }
    }, [id, router]);

    const fetchDam = async () => {
        try {
            const res = await fetch(`/api/dams/${id}`);
            const json = await res.json();
            const damData = json?.success ? json.data : json;
            setDam(damData);
        } catch (err) {
            console.error("Error fetching dam:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p className="p-6 text-center">Checking access...</p>;
    if (loading) return <p className="p-6 text-center">Loading dam...</p>;
    if (!dam) return <p className="p-6 text-center text-red-600">Dam not found</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link href="/admin" className="text-sm text-blue-600 inline-block mb-4">
                ← Back to Admin
            </Link>

            <h1 className="text-3xl font-bold text-blue-700 mb-2">{dam.name}</h1>
            <p className="text-sm text-gray-600 mb-4">
                ({dam.year_completed}) — {dam.location} — {dam.river}
            </p>

            <div className="bg-white shadow rounded-lg p-6 space-y-3">
                <p><strong>Catchment Area:</strong> {dam.catchment_area_km2} km²</p>
                <p><strong>Runoff Coefficient:</strong> {dam.runoff_coefficient}</p>
                <p><strong>Gross Storage:</strong> {dam.gross_storage_capacity_1000m3} ×1000 m³</p>
                <p><strong>Current Water Level:</strong> {dam.water_level_percentage ?? 50}%</p>

                {/* Rainfall input form */}
                <UpdateWaterLevelForm dam={dam} />
            </div>
        </div>
    );
}
