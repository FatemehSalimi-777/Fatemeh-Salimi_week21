import { cookies } from "next/headers";

export const getBackendToken = async () => {
	const cookieStore = await cookies();

	return cookieStore.get("token")?.value || null;
};

export const backendFetch = async (path, options = {}) => {
	const token = await getBackendToken();
	// console.log("TOKEN =>", token);
	const headers = new Headers(options.headers || {});

	headers.set("Content-Type", "application/json");

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}
	console.log("REQUEST =>", {
		url: `${process.env.API_URL}${path}`,
		method: options.method,
		headers: Object.fromEntries(headers.entries()),
	});

	return fetch(`${process.env.API_URL}${path}`, {
		...options,
		headers,
	});
};

export const getBackendResponseData = async (response) => {
	const contentType = response.headers.get("content-type");

	if (contentType?.includes("application/json")) {
		return response.json();
	}

	return null;
};
