import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();

		const response = await fetch(`${process.env.API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		return NextResponse.json(data, {
			status: response.status,
		});
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
