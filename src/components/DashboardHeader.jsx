"use client";

import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuEraser } from "react-icons/lu";

import "./DashboardHeader.css";

const DashboardHeader = ({
	username,
	role = "مدیر",
	searchValue = "",
	onSearchChange,
	onClearSearch,
}) => {
	const [inputValue, setInputValue] = useState(searchValue);

	useEffect(() => {
		setInputValue(searchValue);
	}, [searchValue]);

	useEffect(() => {
		if (inputValue === searchValue) {
			return;
		}

		const timer = setTimeout(() => {
			onSearchChange(inputValue);
		}, 400);

		return () => clearTimeout(timer);
	}, [inputValue, searchValue, onSearchChange]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleClearSearch = () => {
		setInputValue("");
		onClearSearch();
	};

	return (
		<div className="dashboard-header">
			<div className="dashboard-search">
				<FaMagnifyingGlass />

				<input
					type="text"
					placeholder="جستجو..."
					value={inputValue}
					onChange={handleInputChange}
				/>

				{inputValue && (
					<button
						type="button"
						className="dashboard-search-clear"
						onClick={handleClearSearch}
						aria-label="پاک کردن جستجو">
						<LuEraser />
					</button>
				)}
			</div>

			<div className="dashboard-user">
				<div className="dashboard-avatar">
					{username?.charAt(0)?.toUpperCase() || "U"}
				</div>

				<div className="dashboard-user-info">
					<span className="dashboard-username">{username}</span>
					<span className="dashboard-role">{role}</span>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
