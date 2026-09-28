"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "@/components/AuthLayout";
import { loginUser } from "@/api/authApi";
import { setAuth } from "@/store/auth/authSlice";

const LoginForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch();

	const successMessage = searchParams.get("message");
	const usernameFromRegister = searchParams.get("username") || "";

	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState("");

	useEffect(() => {
		setForm((prev) => ({
			...prev,
			username: usernameFromRegister,
		}));
	}, [usernameFromRegister]);

	const loginMutation = useMutation({
		mutationFn: loginUser,

		onSuccess: () => {
			dispatch(
				setAuth({
					username: form.username,
				})
			);

			router.push("/dashboard");
		},

		onError: (error) => {
			setError(
				error?.response?.data?.message || "نام کاربری یا رمز عبور اشتباه است."
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
			setError("لطفاً نام کاربری و رمز عبور را وارد کنید.");

			return;
		}

		loginMutation.mutate(form);
	};

	return (
		<AuthLayout
			title="فرم ورود"
			footer={
				<div className="auth-footer">
					<button
						type="button"
						className="auth-link"
						onClick={() => router.push("/register")}>
						ایجاد حساب کاربری!
					</button>
				</div>
			}>
			<form onSubmit={handleSubmit}>
				{successMessage && <div className="auth-success">{successMessage}</div>}

				<input
					className="auth-input"
					type="text"
					name="username"
					placeholder="نام کاربری"
					value={form.username}
					onChange={handleChange}
					autoComplete="username"
				/>

				<input
					className="auth-input"
					type="password"
					name="password"
					placeholder="رمز عبور"
					value={form.password}
					onChange={handleChange}
					autoComplete="current-password"
				/>

				{error && <div className="auth-error">{error}</div>}

				<button
					type="submit"
					className="auth-button"
					disabled={loginMutation.isPending}>
					{loginMutation.isPending ? "در حال ورود..." : "ورود"}
				</button>
			</form>
		</AuthLayout>
	);
};

export default LoginForm;
