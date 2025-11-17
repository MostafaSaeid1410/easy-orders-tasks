import { API_ENDPOINTS } from "../../../api/config";
import type { ApiProduct } from "./productsApis.types";

export const fetchProductBySlug = async (
    storeSlug: string,
    productSlug: string,
    join?: string,
): Promise<ApiProduct> => {
    const url = API_ENDPOINTS.products.bySlug(storeSlug, productSlug, join);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return response.json();
};
