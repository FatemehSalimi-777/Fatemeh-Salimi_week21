"use client";

import "./ConfirmModal.css";

const ConfirmModal = ({
	isOpen,
	title = "تأیید حذف",
	message,
	onConfirm,
	onCancel,
	isLoading = false,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="confirm-modal-overlay" onMouseDown={onCancel}>
			<div
				className="confirm-modal"
				onMouseDown={(event) => event.stopPropagation()}>
				<div className="confirm-modal-content">
					<h2>{title}</h2>

					<p>{message}</p>
				</div>

				<div className="confirm-modal-actions">
					<button
						type="button"
						className="confirm-modal-cancel"
						onClick={onCancel}
						disabled={isLoading}>
						انصراف
					</button>

					<button
						type="button"
						className="confirm-modal-delete"
						onClick={onConfirm}
						disabled={isLoading}>
						{isLoading ? "در حال حذف..." : "حذف"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
