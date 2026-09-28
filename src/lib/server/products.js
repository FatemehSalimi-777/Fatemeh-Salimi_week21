import { getBackendToken } from "./backend";

const API_URL = process.env.API_URL;

export async function getProductsServer({ page = 1, limit = 10, search = "" }) {
	const token = await getBackendToken();

	const response = await fetch(
		`${API_URL}/products?page=${page}&limit=${limit}&search=${encodeURIComponent(
			search
		)}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			cache: "no-store",
		}
	);

	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	return response.json();
}
