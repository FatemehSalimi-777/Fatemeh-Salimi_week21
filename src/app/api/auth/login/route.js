import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();

		const response = await fetch(`${process.env.API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, {
				status: response.status,
			});
		}

		const nextResponse = NextResponse.json({
			message: "ورود با موفقیت انجام شد.",
		});

		nextResponse.cookies.set("token", data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});

		nextResponse.cookies.set("username", body.username, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});

		return nextResponse;
	} catch {
		return NextResponse.json(
			{
				message: "خطا در برقراری ارتباط با سرور.",
			},
			{
				status: 500,
			}
		);
	}
}
