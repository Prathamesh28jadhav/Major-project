import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

    if (!user.otp || !user.otpExpiry) {
      return new Response(JSON.stringify({ message: "No OTP found for user" }), { status: 400 });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return new Response(JSON.stringify({ message: "OTP expired" }), { status: 400 });
    }

    if (user.otp !== otp) {
      return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
    }

    // OTP valid: clear otp fields (mark verified)
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return new Response(JSON.stringify({ message: "OTP verified" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
