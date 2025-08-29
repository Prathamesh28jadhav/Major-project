"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import gsap from "gsap";
import TransitionWrapper from "@/components/TransitionWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TwoFactorPage() {
  const search = useSearchParams();
  const router = useRouter();
  const email = search.get("email") || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    // subtle entrance for OTP input
    gsap.fromTo(".otp-input", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" });
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        // show success and navigate to login
        setMessage("OTP verified — redirecting to login");
        gsap.fromTo(notificationRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "bounce.out" });
        setTimeout(() => {
          gsap.to(notificationRef.current, { y: -80, opacity: 0, duration: 0.5, onComplete: () => router.push("/login?justVerified=1") });
        }, 1200);
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred");
    }
  };

  return (
    <TransitionWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white to-sky-50">
        <div ref={notificationRef} className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg opacity-0">
          OTP Verified
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Two-Factor Authentication</CardTitle>
            <p className="text-center text-sm text-gray-600">Enter the 6-digit code sent to <strong>{email}</strong></p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                className="otp-input w-full border p-3 rounded-lg text-center text-lg tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Verify OTP</Button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
          </CardContent>
        </Card>
      </div>
    </TransitionWrapper>
  );
}
