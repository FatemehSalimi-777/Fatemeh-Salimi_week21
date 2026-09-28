import { NextResponse } from "next/server";
import { backendFetch, getBackendResponseData } from "@/lib/server/backend";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);

		const page = searchParams.get("page") || "1";

		const limit = searchParams.get("limit") || "10";

		const response = await backendFetch(
			`/products?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(
				limit
			)}`,
			{
				method: "GET",
			}
		);

		const data = await getBackendResponseData(response);

		return NextResponse.json(data, {
			status: response.status,
		});
	} catch {
		return NextResponse.json(
			{
				message: "دریافت محصولات با خطا مواجه شد.",
			},
			{
				status: 500,
			}
		);
	}
}

export async function POST(request) {
	try {
		const body = await request.json();

		const response = await backendFetch("/products", {
			method: "POST",
			body: JSON.stringify({
				name: body.name,
				price: body.price,
				quantity: body.quantity,
			}),
		});

		const data = await getBackendResponseData(response);

		return NextResponse.json(data, {
			status: response.status,
		});
	} catch {
		return NextResponse.json(
			{
				message: "افزودن محصول با خطا مواجه شد.",
			},
			{
				status: 500,
			}
		);
	}
}

export async function DELETE(request) {
	try {
		const body = await request.json();

		const response = await backendFetch("/products", {
			method: "DELETE",
			body: JSON.stringify({
				ids: body.ids,
			}),
		});

		const data = await getBackendResponseData(response);

		return NextResponse.json(data, {
			status: response.status,
		});
	} catch {
		return NextResponse.json(
			{
				message: "حذف محصولات انجام نشد.",
			},
			{
				status: 500,
			}
		);
	}
}
