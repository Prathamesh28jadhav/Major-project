// /app/api/dams/route.js (Next.js App Router with mongoose)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Dam from "@/models/dams";  // mongoose model

// Create a dam (POST)
export async function POST(req) {
    try {
        await connectDB();

        const data = await req.json();
        const dam = await Dam.create(data);

        return NextResponse.json({ success: true, message: "Dam info saved!", data: dam });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Error saving dam info", error: err.message },
            { status: 500 }
        );
    }
}

// Fetch all dams (GET)
export async function GET() {
    try {
        await connectDB();

        const dams = await Dam.find({});
        return NextResponse.json({ success: true, data: dams });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Error fetching dams", error: err.message },
            { status: 500 }
        );
    }
}
