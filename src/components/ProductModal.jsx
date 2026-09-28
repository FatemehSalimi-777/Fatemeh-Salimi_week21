"use client";

import "./ProductModal.css";

const ProductModal = ({
	isOpen,
	onClose,
	title = "افزودن محصول",
	children,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="product-modal-overlay" onMouseDown={onClose}>
			<div
				className="product-modal"
				onMouseDown={(event) => event.stopPropagation()}>
				<div className="product-modal-header">
					<h2>{title}</h2>

					<button
						type="button"
						className="product-modal-close"
						onClick={onClose}
						aria-label="بستن">
						×
					</button>
				</div>

				<div className="product-modal-content">{children}</div>
			</div>
		</div>
	);
};

export default ProductModal;
