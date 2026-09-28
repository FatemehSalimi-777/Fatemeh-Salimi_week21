import api from "@/lib/server/api";

export const getProducts = async ({ page = 1, limit = 10, search = "" }) => {
	const response = await api.get("/products", {
		params: {
			page,
			limit,
			search,
		},
	});

	return response.data;
};

export const createProduct = async ({ name, price, quantity }) => {
	const response = await fetch("/api/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			price,
			quantity,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "افزودن محصول با خطا مواجه شد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};

export const updateProduct = async ({ id, name, price, quantity }) => {
	const response = await fetch(`/api/products/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			price,
			quantity,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "ویرایش محصول با خطا مواجه شد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};

export const deleteProduct = async (id) => {
	const response = await fetch(`/api/products/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "حذف محصول انجام نشد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};

export const bulkDeleteProducts = async (ids) => {
	const response = await fetch("/api/products", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			ids,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "حذف محصولات انجام نشد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};
