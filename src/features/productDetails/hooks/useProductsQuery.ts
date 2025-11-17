import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "../api/productsApis";
import { mapApiProductToProduct } from "../utils/productHelpers";

export const useProductBySlug = (
    storeSlug: string,
    productSlug: string,
    options?: {
        join?: string;
        enabled?: boolean;
    },
) =>
    useQuery({
        queryKey: ["product", storeSlug, productSlug, options?.join],
        queryFn: () =>
            fetchProductBySlug(storeSlug, productSlug, options?.join),
        enabled: options?.enabled !== false && !!storeSlug && !!productSlug,
        select: (data) => mapApiProductToProduct(data),
    });

export const useProductBySlugRaw = (
    storeSlug: string,
    productSlug: string,
    options?: {
        join?: string;
        enabled?: boolean;
    },
) =>
    useQuery({
        queryKey: ["product-raw", storeSlug, productSlug, options?.join],
        queryFn: () =>
            fetchProductBySlug(storeSlug, productSlug, options?.join),
        enabled: options?.enabled !== false && !!storeSlug && !!productSlug,
    });

export const useProduct = (id: string | number) =>
    useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            throw new Error(
                "useProduct by ID not implemented. Use useProductBySlug instead.",
            );
        },
        enabled: false,
    });
