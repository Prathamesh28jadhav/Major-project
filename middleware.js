import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check role for admin pages
        if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } catch (err) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // protect all admin routes
};
