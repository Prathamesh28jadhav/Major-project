"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const notificationRef = useRef(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        gsap.fromTo(notificationRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" });
        setTimeout(() => {
          gsap.to(notificationRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.6,
            onComplete: () => router.push("/twofactor?email=" + form.email),
          });
        }, 2000);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <TransitionWrapper>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
        {/* Floating background shapes */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>

        {/* Notification */}
        <div ref={notificationRef} className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg opacity-0">
          Registration successful!
        </div>

        <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Register</Button>
            </form>
            <p className="text-center mt-4">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
          </CardContent>
        </Card>
      </div>
    </TransitionWrapper>
  );
}
