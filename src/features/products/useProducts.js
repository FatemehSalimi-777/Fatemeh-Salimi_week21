import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsApi";

export const useProducts = (page, limit, search = "") => {
	return useQuery({
		queryKey: ["products", page, limit, search],

		queryFn: () =>
			getProducts({
				page,
				limit,
				search,
			}),

		staleTime: 60 * 1000,
	});
};
