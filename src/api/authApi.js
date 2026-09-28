export const registerUser = async ({ username, password }) => {
	const response = await fetch("/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "ثبت نام با خطا مواجه شد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};

export const loginUser = async ({ username, password }) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "ورود با خطا مواجه شد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};

export const logoutUser = async () => {
	const response = await fetch("/api/auth/logout", {
		method: "POST",
	});

	const data = await response.json();

	if (!response.ok) {
		const error = new Error(data?.message || "خروج با خطا مواجه شد.");

		error.response = {
			data,
		};

		throw error;
	}

	return data;
};
