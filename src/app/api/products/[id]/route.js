import { NextResponse } from "next/server";
import { backendFetch, getBackendResponseData } from "@/lib/server/backend";

export async function GET(request, { params }) {
	try {
		const { id } = await params;

		const response = await backendFetch(`/products/${encodeURIComponent(id)}`, {
			method: "GET",
		});

		const data = await getBackendResponseData(response);

		return NextResponse.json(data, {
			status: response.status,
		});
	} catch {
		return NextResponse.json(
			{
				message: "دریافت محصول با خطا مواجه شد.",
			},
			{
				status: 500,
			}
		);
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = await params;

		console.log("ID =>", id);

		const body = await request.json();

		console.log("BODY =>", body);

		const response = await backendFetch(`/products/${encodeURIComponent(id)}`, {
			method: "PUT",
			body: JSON.stringify(body),
		});

		console.log("STATUS =>", response.status);

		const text = await response.clone().text();

		console.log("RESPONSE =>", text);

		const data = await getBackendResponseData(response);

		return NextResponse.json(data, {
			status: response.status,
		});
	} catch (error) {
		console.error(error);
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = await params;

		const response = await backendFetch(`/products/${encodeURIComponent(id)}`, {
			method: "DELETE",
		});

		const data = await getBackendResponseData(response);

		return NextResponse.json(data, {
			status: response.status,
		});
	} catch {
		return NextResponse.json(
			{
				message: "حذف محصول انجام نشد.",
			},
			{
				status: 500,
			}
		);
	}
}
