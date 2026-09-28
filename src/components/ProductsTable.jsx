"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VscSettingsCompact } from "react-icons/vsc";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { useProducts } from "@/features/products/useProducts";

import "./ProductsTable.css";

const LIMIT = 10;

const ProductsTable = ({ onEdit, onDelete, onBulkDelete, clearSelection }) => {
	const [selectedIds, setSelectedIds] = useState([]);

	const router = useRouter();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const search = searchParams.get("search") || "";

	const { data, isLoading, isFetching, isError, error } = useProducts(
		page,
		LIMIT,
		search
	);

	useEffect(() => {
		setSelectedIds([]);
	}, [clearSelection]);

	const totalPages = data?.totalPages || 1;

	const handlePageChange = (newPage) => {
		if (newPage < 1 || newPage > totalPages || newPage === page) {
			return;
		}

		const params = new URLSearchParams(searchParams);

		params.set("page", String(newPage));

		router.push(`/dashboard?${params.toString()}`);
	};

	const handlePrevious = () => {
		handlePageChange(page - 1);
	};

	const handleNext = () => {
		handlePageChange(page + 1);
	};

	const handleSelectProduct = (id) => {
		setSelectedIds((prev) =>
			prev.includes(id)
				? prev.filter((selectedId) => selectedId !== id)
				: [...prev, id]
		);
	};

	const handleSelectAll = () => {
		const currentPageIds = data?.data?.map((product) => product.id) || [];

		const isAllSelected =
			currentPageIds.length > 0 &&
			currentPageIds.every((id) => selectedIds.includes(id));

		if (isAllSelected) {
			setSelectedIds((prev) =>
				prev.filter((id) => !currentPageIds.includes(id))
			);

			return;
		}

		setSelectedIds((prev) => [...new Set([...prev, ...currentPageIds])]);
	};

	const handleDelete = (id) => {
		onDelete(id);
	};

	const handleBulkDelete = () => {
		if (!selectedIds.length) {
			return;
		}

		onBulkDelete(selectedIds);
	};

	if (isLoading) {
		return <div className="products-table-state">در حال دریافت محصولات...</div>;
	}

	if (isError) {
		console.log("React Query Error:", error);

		return (
			<div className="products-table-state products-table-error">
				{error?.response?.data?.message || "دریافت محصولات با خطا مواجه شد."}
			</div>
		);
	}

	return (
		<div className="products-table-wrapper">
			<div className="products-table-header">
				<div>
					<h2 className="products-title">
						<VscSettingsCompact />
						مدیریت کالا
					</h2>

					<span>{data?.totalProducts || 0} محصول</span>
				</div>

				{isFetching && !isLoading && (
					<span className="products-refreshing">در حال بروزرسانی...</span>
				)}
			</div>

			<div className="products-table-container">
				{selectedIds.length > 0 && (
					<div className="bulk-actions">
						<button
							type="button"
							className="bulk-delete-button"
							onClick={handleBulkDelete}>
							حذف انتخاب‌شده‌ها ({selectedIds.length})
						</button>
					</div>
				)}

				<table className="products-table">
					<thead>
						<tr>
							<th>
								<input
									type="checkbox"
									checked={
										data?.data?.length > 0 &&
										data.data.every((product) =>
											selectedIds.includes(product.id)
										)
									}
									onChange={handleSelectAll}
								/>
							</th>

							<th>نام کالا</th>
							<th>موجودی</th>
							<th>قیمت</th>
							<th>شناسه کالا</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{data?.data?.length === 0 ? (
							<tr>
								<td colSpan="6" className="products-table-empty">
									{search.trim()
										? "محصولی با این عبارت پیدا نشد."
										: "محصولی وجود ندارد."}
								</td>
							</tr>
						) : (
							data?.data?.map((product) => (
								<tr key={product.id}>
									<td>
										<input
											type="checkbox"
											checked={selectedIds.includes(product.id)}
											onChange={() => handleSelectProduct(product.id)}
										/>
									</td>

									<td className="product-name">{product.name}</td>

									<td>{product.quantity}</td>

									<td>{product.price}</td>

									<td>{product.id}</td>

									<td>
										<div className="product-actions">
											<button
												type="button"
												className="edit-button"
												onClick={() => onEdit(product)}>
												<FiEdit />
											</button>

											<button
												type="button"
												className="delete-button"
												onClick={() => handleDelete(product.id)}>
												<FiTrash2 />
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			<div className="products-pagination">
				<button
					type="button"
					className="pagination-button"
					onClick={handlePrevious}
					disabled={page === 1}>
					قبلی
				</button>

				<div className="pagination-pages">
					{Array.from({ length: totalPages }, (_, index) => index + 1).map(
						(pageNumber) => (
							<button
								key={pageNumber}
								type="button"
								className={`pagination-page ${
									page === pageNumber ? "active" : ""
								}`}
								onClick={() => handlePageChange(pageNumber)}>
								{pageNumber}
							</button>
						)
					)}
				</div>

				<button
					type="button"
					className="pagination-button"
					onClick={handleNext}
					disabled={page === totalPages}>
					بعدی
				</button>
			</div>
		</div>
	);
};

export default ProductsTable;
