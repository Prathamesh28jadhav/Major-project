import { NextResponse } from "next/server";

export async function GET() {
    // Example: Simulate DB user
    const user = { email: "admin@example.com", role: "admin" };

    return NextResponse.json(user);
}
