import type { ApiProduct, ApiProductVariant } from "../../features/productDetails/api/productsApis.types";

export interface CartItem {
    id: string;
    productId: string;
    productName: string;
    productSlug: string;
    productImage: string;
    variantId: string | null;
    variant: ApiProductVariant | null;
    selectedVariations: Record<string, string>;
    price: number;
    originalPrice?: number;
    quantity: number;
    maxQuantity: number;
}

export interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    addItem: (
        product: ApiProduct,
        variant: ApiProductVariant | null,
        selectedVariations: Record<string, string>,
        quantity?: number,
    ) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    getTotalItems: () => number;
    getTotalPrice: () => number;
    getItemQuantity: (itemId: string) => number;
    isItemInCart: (itemId: string) => boolean;
    getCartItemId: (
        productId: string,
        variantId: string | null,
        selectedVariations: Record<string, string>,
    ) => string;
}

