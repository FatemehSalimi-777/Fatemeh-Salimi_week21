"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "@/components/AuthLayout";
import { registerUser } from "@/api/authApi";

export default function RegisterForm() {
	const router = useRouter();

	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState("");

	const registerMutation = useMutation({
		mutationFn: registerUser,

		onSuccess: (data) => {
			router.push(
				`/login?message=${encodeURIComponent(
					data?.message || "ثبت نام با موفقیت انجام شد"
				)}&username=${encodeURIComponent(form.username)}`
			);
		},

		onError: (error) => {
			setError(
				error?.response?.data?.message ||
					"ثبت نام انجام نشد. لطفاً دوباره تلاش کنید."
			);
		},
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));

		setError("");
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!form.username.trim() || !form.password) {
			setError("لطفاً تمام فیلدها را تکمیل کنید.");
			return;
		}

		if (form.password !== form.confirmPassword) {
			setError("رمز عبور و تکرار رمز عبور یکسان نیستند.");
			return;
		}

		registerMutation.mutate({
			username: form.username,
			password: form.password,
		});
	};

	return (
		<AuthLayout
			title="فرم ثبت نام"
			footer={
				<div className="auth-footer">
					<button
						type="button"
						className="auth-link"
						onClick={() => router.push("/login")}>
						حساب کاربری دارید؟
					</button>
				</div>
			}>
			<form onSubmit={handleSubmit}>
				<input
					className="auth-input"
					type="text"
					name="username"
					placeholder="نام کاربری"
					value={form.username}
					onChange={handleChange}
				/>

				<input
					className="auth-input"
					type="password"
					name="password"
					placeholder="رمز عبور"
					value={form.password}
					onChange={handleChange}
				/>

				<input
					className="auth-input"
					type="password"
					name="confirmPassword"
					placeholder="تکرار رمز عبور"
					value={form.confirmPassword}
					onChange={handleChange}
				/>

				{error && <div className="auth-error">{error}</div>}

				<button
					type="submit"
					className="auth-button"
					disabled={registerMutation.isPending}>
					{registerMutation.isPending ? "در حال ثبت نام..." : "ثبت نام"}
				</button>
			</form>
		</AuthLayout>
	);
}
