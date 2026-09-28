"use client";

import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import ProductsTable from "@/components/ProductsTable";
import ProductModal from "@/components/ProductModal";
import ProductForm from "@/components/ProductForm";
import Toast from "@/components/Toast";
import ConfirmModal from "@/components/ConfirmModal";
import DashboardHeader from "@/components/DashboardHeader";

import {
	createProduct,
	updateProduct,
	deleteProduct,
	bulkDeleteProducts,
} from "@/api/productsApi";

import "./DashboardClient.css";

const EMPTY_PRODUCT = {
	name: "",
	price: "",
	quantity: "",
};

const DashboardClient = ({ username, initialSearch = "" }) => {
	const queryClient = useQueryClient();

	const router = useRouter();
	const searchParams = useSearchParams();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [toast, setToast] = useState(null);

	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		type: null,
		productId: null,
		productCount: 0,
	});

	const [selectedDeleteIds, setSelectedDeleteIds] = useState([]);
	const [clearTableSelection, setClearTableSelection] = useState(false);

	const handleSearchChange = useCallback(
		(value) => {
			const params = new URLSearchParams(searchParams);

			const trimmedValue = value.trim();

			if (trimmedValue) {
				params.set("search", trimmedValue);
			} else {
				params.delete("search");
			}

			params.set("page", "1");

			router.push(`/dashboard?${params.toString()}`);
		},
		[router, searchParams]
	);

	const handleClearSearch = useCallback(() => {
		const params = new URLSearchParams(searchParams);

		params.delete("search");
		params.set("page", "1");

		router.push(`/dashboard?${params.toString()}`);
	}, [router, searchParams]);

	const resetModal = () => {
		setIsModalOpen(false);
		setModalMode("add");
		setSelectedProduct(null);
	};

	const createProductMutation = useMutation({
		mutationFn: createProduct,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products"],
			});

			resetModal();

			setToast({
				type: "success",
				message: "محصول با موفقیت اضافه شد.",
			});
		},

		onError: (error) => {
			setToast({
				type: "error",
				message:
					error?.response?.data?.message || "افزودن محصول با خطا مواجه شد.",
			});
		},
	});

	const updateProductMutation = useMutation({
		mutationFn: updateProduct,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products"],
			});

			resetModal();

			setToast({
				type: "success",
				message: "محصول با موفقیت ویرایش شد.",
			});
		},

		onError: (error) => {
			setToast({
				type: "error",
				message:
					error?.response?.data?.message || "ویرایش محصول با خطا مواجه شد.",
			});
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteProduct,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products"],
			});

			setClearTableSelection((prev) => !prev);

			setDeleteModal({
				isOpen: false,
				type: null,
				productId: null,
				productCount: 0,
			});

			setToast({
				message: "محصول با موفقیت حذف شد.",
				type: "success",
			});
		},

		onError: () => {
			setToast({
				message: "حذف محصول انجام نشد.",
				type: "error",
			});
		},
	});

	const bulkDeleteMutation = useMutation({
		mutationFn: bulkDeleteProducts,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products"],
			});

			setClearTableSelection((prev) => !prev);
			setSelectedDeleteIds([]);

			setDeleteModal({
				isOpen: false,
				type: null,
				productId: null,
				productCount: 0,
			});

			setToast({
				message: "محصولات انتخاب‌شده با موفقیت حذف شدند.",
				type: "success",
			});
		},

		onError: () => {
			setToast({
				message: "حذف محصولات انجام نشد.",
				type: "error",
			});
		},
	});

	const isSubmitting =
		createProductMutation.isPending || updateProductMutation.isPending;

	const openAddModal = () => {
		setSelectedProduct(null);
		setModalMode("add");
		setIsModalOpen(true);
	};

	const openEditModal = (product) => {
		setSelectedProduct(product);
		setModalMode("edit");
		setIsModalOpen(true);
	};

	const openDeleteModal = (productId) => {
		setDeleteModal({
			isOpen: true,
			type: "single",
			productId,
			productCount: 1,
		});
	};

	const openBulkDeleteModal = (ids) => {
		setSelectedDeleteIds(ids);

		setDeleteModal({
			isOpen: true,
			type: "bulk",
			productId: null,
			productCount: ids.length,
		});
	};

	const handleConfirmDelete = () => {
		if (deleteModal.type === "single") {
			deleteMutation.mutate(deleteModal.productId);
			return;
		}

		if (deleteModal.type === "bulk") {
			bulkDeleteMutation.mutate(selectedDeleteIds);
		}
	};

	const closeDeleteModal = () => {
		if (deleteMutation.isPending || bulkDeleteMutation.isPending) {
			return;
		}

		setDeleteModal({
			isOpen: false,
			type: null,
			productId: null,
			productCount: 0,
		});

		setSelectedDeleteIds([]);
	};

	const handleProductSubmit = (values) => {
		if (modalMode === "edit" && selectedProduct) {
			updateProductMutation.mutate({
				id: selectedProduct.id,
				...values,
			});

			return;
		}

		createProductMutation.mutate(values);
	};

	const formInitialValues =
		modalMode === "edit" && selectedProduct
			? {
					name: selectedProduct.name,
					price: selectedProduct.price,
					quantity: selectedProduct.quantity,
			  }
			: EMPTY_PRODUCT;

	const modalTitle = modalMode === "edit" ? "ویرایش محصول" : "افزودن محصول";

	const submitText = modalMode === "edit" ? "ذخیره تغییرات" : "افزودن محصول";

	return (
		<div className="dashboard-page">
			<div className="dashboard-container">
				<DashboardHeader
					username={username}
					role="مدیر"
					searchValue={initialSearch}
					onSearchChange={handleSearchChange}
					onClearSearch={handleClearSearch}
				/>

				<div className="dashboard-title">
					<button
						type="button"
						className="add-product-button"
						onClick={openAddModal}>
						+ افزودن محصول
					</button>
				</div>

				<ProductsTable
					onEdit={openEditModal}
					onDelete={openDeleteModal}
					onBulkDelete={openBulkDeleteModal}
					clearSelection={clearTableSelection}
				/>

				<ProductModal
					isOpen={isModalOpen}
					onClose={resetModal}
					title={modalTitle}>
					<ProductForm
						key={`${modalMode}-${selectedProduct?.id || "new"}`}
						initialValues={formInitialValues}
						onSubmit={handleProductSubmit}
						isSubmitting={isSubmitting}
						submitText={submitText}
					/>
				</ProductModal>

				<ConfirmModal
					isOpen={deleteModal.isOpen}
					onCancel={closeDeleteModal}
					onConfirm={handleConfirmDelete}
					isLoading={deleteMutation.isPending || bulkDeleteMutation.isPending}
					title={deleteModal.type === "bulk" ? "حذف محصولات" : "حذف محصول"}
					message={
						deleteModal.type === "bulk"
							? `آیا از حذف ${deleteModal.productCount} محصول انتخاب‌شده مطمئن هستید؟`
							: "آیا از حذف این محصول مطمئن هستید؟"
					}
				/>

				{toast && (
					<Toast
						message={toast.message}
						type={toast.type}
						onClose={() => setToast(null)}
					/>
				)}
			</div>
		</div>
	);
};

export default DashboardClient;
