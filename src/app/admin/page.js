"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [dams, setDams] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        year_completed: "",
        river: "",
        location: "",
        type: "",
        height_m: "",
        length_m: "",
        volume_content_1000m3: "",
        gross_storage_capacity_1000m3: "",
        reservoir_area_1000m2: "",
        effective_storage_capacity_1000m3: "",
        purpose: "",
        designed_spillway_capacity_m3s: "",
    });

    const router = useRouter();

    // Reset form helper
    const resetForm = () => {
        setForm({
            name: "",
            year_completed: "",
            river: "",
            location: "",
            type: "",
            height_m: "",
            length_m: "",
            volume_content_1000m3: "",
            gross_storage_capacity_1000m3: "",
            reservoir_area_1000m2: "",
            effective_storage_capacity_1000m3: "",
            purpose: "",
            designed_spillway_capacity_m3s: "",
        });
    };

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/login"); // redirect non-admins
        } else {
            setUser({ role });
            fetchDams();
        }
    }, [router]);

    // Fetch existing dams
    const fetchDams = async () => {
        try {
            const res = await fetch("/api/dams");
            const data = await res.json();
            console.log("API Response:", data);
            if (data.success) {
                setDams(data.data);
            }
        } catch (err) {
            console.error("Error fetching dams:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit new dam
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/dams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                setDams([...dams, data.data]); // append new dam
                resetForm();
            } else {
                alert("Error saving dam");
            }
        } catch (err) {
            console.error("Error submitting dam:", err);
            alert("Something went wrong");
        }
    };

    if (!user) {
        return <p className="p-6 text-center">Checking access...</p>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin - Dams</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-8"
            >
                {Object.keys(form).map((key) => (
                    <div key={key}>
                        <label className="block font-medium text-gray-700 capitalize">
                            {key.replaceAll("_", " ")}
                        </label>
                        <input
                            type="text"
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md"
                >
                    Save Dam
                </button>
            </form>

            {/* Dams List */}
            <h2 className="text-2xl font-semibold mb-4">All Dams</h2>
            {loading ? (
                <p className="text-gray-500">Loading dams...</p>
            ) : dams.length === 0 ? (
                <p className="text-gray-500">No dams available</p>
            ) : (
                <ul className="space-y-3">
                    {dams.map((dam) => (
                        <li
                            key={dam._id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <strong className="text-blue-700">{dam.name}</strong>{" "}
                            ({dam.year_completed}) — {dam.location}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
