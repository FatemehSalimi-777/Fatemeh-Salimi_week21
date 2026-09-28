"use client";

import { useState } from "react";
import "./ProductForm.css";

const EMPTY_VALUES = {
	name: "",
	price: "",
	quantity: "",
};

const ProductForm = ({
	initialValues = EMPTY_VALUES,
	onSubmit,
	isSubmitting = false,
	submitText = "ذخیره",
}) => {
	const [form, setForm] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: "",
		}));
	};

	const validate = () => {
		const newErrors = {};

		if (!form.name.trim()) {
			newErrors.name = "نام محصول الزامی است.";
		}

		if (form.price === "") {
			newErrors.price = "قیمت محصول الزامی است.";
		} else if (Number(form.price) < 0) {
			newErrors.price = "قیمت نمی‌تواند منفی باشد.";
		}

		if (form.quantity === "") {
			newErrors.quantity = "تعداد محصول الزامی است.";
		} else if (Number(form.quantity) < 0) {
			newErrors.quantity = "تعداد نمی‌تواند منفی باشد.";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!validate()) {
			return;
		}

		onSubmit({
			name: form.name.trim(),
			price: Number(form.price),
			quantity: Number(form.quantity),
		});
	};

	return (
		<form className="product-form" onSubmit={handleSubmit}>
			<div className="product-form-field">
				<label htmlFor="name">نام محصول</label>

				<input
					id="name"
					name="name"
					type="text"
					placeholder="نام محصول را وارد کنید"
					value={form.name}
					onChange={handleChange}
					disabled={isSubmitting}
				/>

				{errors.name && (
					<span className="product-form-error">{errors.name}</span>
				)}
			</div>

			<div className="product-form-field">
				<label htmlFor="price">قیمت</label>

				<input
					id="price"
					name="price"
					type="number"
					min="0"
					placeholder="قیمت محصول"
					value={form.price}
					onChange={handleChange}
					disabled={isSubmitting}
				/>

				{errors.price && (
					<span className="product-form-error">{errors.price}</span>
				)}
			</div>

			<div className="product-form-field">
				<label htmlFor="quantity">تعداد</label>

				<input
					id="quantity"
					name="quantity"
					type="number"
					min="0"
					placeholder="تعداد محصول"
					value={form.quantity}
					onChange={handleChange}
					disabled={isSubmitting}
				/>

				{errors.quantity && (
					<span className="product-form-error">{errors.quantity}</span>
				)}
			</div>

			<button
				type="submit"
				className="product-form-submit"
				disabled={isSubmitting}>
				{isSubmitting ? "در حال ذخیره..." : submitText}
			</button>
		</form>
	);
};

export default ProductForm;
