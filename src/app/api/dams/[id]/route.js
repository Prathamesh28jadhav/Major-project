import { connectDB } from "@/lib/mongodb";
import Dam from "@/models/dams";  // make sure the file is src/models/dams.js
import { NextResponse } from "next/server";

// GET a single dam
export async function GET(req, { params }) {
    await connectDB();
    try {
        const dam = await Dam.findById(params.id);
        if (!dam) {
            return NextResponse.json(
                { success: false, error: "Dam not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: dam });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// PUT update dam (rainfall → update water level)
export async function PUT(req, { params }) {
    try {
        await connectDB();
        const id = params?.id?.toString().trim();
        const body = await req.json();

        const { water_level_percentage, rainfall_mm } = body;

        const dam = await Dam.findByIdAndUpdate(
            id,
            {
                $set: {
                    water_level_percentage,
                    last_rainfall_mm: rainfall_mm,
                },
                $push: {
                    waterLogs: {
                        rainfall_mm,
                        water_level_percentage,
                        date: new Date(),
                    },
                },
            },
            { new: true }
        );

        if (!dam) {
            return NextResponse.json(
                { success: false, message: "Dam not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Water level updated & logged successfully ✅",
            data: dam,
        });
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}





