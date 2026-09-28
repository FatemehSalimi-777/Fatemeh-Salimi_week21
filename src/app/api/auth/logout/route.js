import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({
		message: "خروج با موفقیت انجام شد.",
	});

	response.cookies.set("token", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});

	response.cookies.set("username", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});

	return response;
}
