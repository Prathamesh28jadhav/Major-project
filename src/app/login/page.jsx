"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";  // ✅ Import router

export default function LoginPage() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const popupRef = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [popup, setPopup] = useState(""); // For showing messages
  const router = useRouter(); // ✅ Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("role", data.role);
        setPopup("Login successful ✅");

        // ✅ Redirect admin to dashboard
        setTimeout(() => {
          router.push("/admin");
        }, 1000); // wait 1 sec to show popup
      } else {
        setPopup(data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      console.error(err);
      setPopup("Something went wrong");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Success popup */}
      {popup && (
        <div
          ref={popupRef}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-medium"
        >
          {popup}
        </div>
      )}

      {/* Login card */}
      <Card className="w-full max-w-md p-8 shadow-xl relative z-10">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Login
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </Card>
    </div>
  );
}
