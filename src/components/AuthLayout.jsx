import Image from "next/image";
import logo from "../../public/Union.png";
import "./AuthLayout.css";

const AuthLayout = ({ title, children, footer }) => {
	return (
		<div className="auth-page">
			<div className="auth-card">
				<div className="auth-logo">
					<Image src={logo} alt="Logo" className="logo-image" priority />
				</div>

				<h1 className="auth-title">{title}</h1>

				<div className="auth-content">{children}</div>

				{footer}
			</div>
		</div>
	);
};

export default AuthLayout;
