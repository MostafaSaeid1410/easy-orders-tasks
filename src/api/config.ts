export const API_BASE_URL = "https://api.easy-orders.net/api/v1";

export const API_ENDPOINTS = {
    products: {
        bySlug: (storeSlug: string, productSlug: string, join?: string) =>
            `${API_BASE_URL}/products/slug/${storeSlug}/${productSlug}${join ? `?join=${join}` : ""}`,
    },
} as const;
