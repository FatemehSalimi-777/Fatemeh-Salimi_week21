import "./globals.css";
import Providers from "./providers";

export const metadata = {
	title: "Admin Dashboard",
	description: "Next.js Admin Dashboard",
};

export default function RootLayout({ children }) {
	return (
		<html lang="fa" dir="rtl">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
