import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage({ searchParams }) {
	const params = await searchParams;

	const search = params.search || "";

	const cookieStore = await cookies();

	const token = cookieStore.get("token")?.value;
	const username = cookieStore.get("username")?.value || "";

	if (!token) {
		redirect("/login");
	}

	return <DashboardClient username={username} initialSearch={search} />;
}
