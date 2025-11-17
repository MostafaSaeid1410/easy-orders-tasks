import { create } from "zustand";
import { produce } from "immer";
import type { ApiProduct, ApiProductVariant } from "../../features/productDetails/api/productsApis.types";
import type { CartItem, CartStore } from "./cart.types";

function generateCartItemId(
    productId: string,
    variantId: string | null,
    selectedVariations: Record<string, string>,
): string {
    if (variantId) {
        return `${productId}-${variantId}`;
    }

    const variationsKey = Object.entries(selectedVariations)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}:${value}`)
        .join("-");

    return variationsKey ? `${productId}-${variationsKey}` : productId;
}

function createCartItem(
    product: ApiProduct,
    variant: ApiProductVariant | null,
    selectedVariations: Record<string, string>,
    quantity: number = 1,
): CartItem {
    const itemId = generateCartItemId(product.id, variant?.id || null, selectedVariations);
    const price = variant
        ? variant.sale_price > 0
            ? variant.sale_price
            : variant.price
        : product.sale_price > 0
          ? product.sale_price
          : product.price;

    const originalPrice =
        variant && variant.sale_price > 0 && variant.sale_price < variant.price
            ? variant.price
            : product.sale_price > 0 && product.sale_price < product.price
              ? product.price
              : undefined;

    const variantQty = variant?.quantity;
    const productQty = product.quantity;
    const maxQuantity =
        variantQty && variantQty > 0
            ? variantQty
            : productQty && productQty > 0
              ? productQty
              : 999;

    return {
        id: itemId,
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.thumb || product.images?.[0] || "",
        variantId: variant?.id || null,
        variant: variant || null,
        selectedVariations,
        price,
        originalPrice,
        quantity,
        maxQuantity,
    };
}

export const useCartStore = create<CartStore>()((set, get) => ({
    items: [],
    isOpen: false,

    addItem: (
        product: ApiProduct,
        variant: ApiProductVariant | null,
        selectedVariations: Record<string, string>,
        quantity: number = 1,
    ) => {
        const variantId = variant?.id || null;
        const itemId = generateCartItemId(
            product.id,
            variantId,
            selectedVariations,
        );

        set(
            produce((state: CartStore) => {
                const existingItemIndex = state.items.findIndex(
                    (item) => item.id === itemId,
                );

                if (existingItemIndex >= 0) {
                    const existingItem = state.items[existingItemIndex];
                    const newQuantity = existingItem.quantity + quantity;
                    const maxQuantity = existingItem.maxQuantity;

                    const finalQuantity = Math.max(
                        1,
                        Math.min(newQuantity, maxQuantity),
                    );
                    state.items[existingItemIndex].quantity = finalQuantity;
                } else {
                    const newItem = createCartItem(
                        product,
                        variant,
                        selectedVariations,
                        quantity,
                    );
                    state.items.push(newItem);
                }
            }),
        );
    },

    removeItem: (itemId: string) => {
        set(
            produce((state: CartStore) => {
                state.items = state.items.filter((item) => item.id !== itemId);
            }),
        );
    },

    updateQuantity: (itemId: string, quantity: number) => {
        set(
            produce((state: CartStore) => {
                const item = state.items.find((item) => item.id === itemId);

                if (item) {
                    const clampedQuantity = Math.max(
                        1,
                        Math.min(quantity, item.maxQuantity),
                    );
                    item.quantity = clampedQuantity;
                }
            }),
        );
    },

    clearCart: () => {
        set(
            produce((state: CartStore) => {
                state.items = [];
            }),
        );
    },

    toggleCart: () => {
        set(
            produce((state: CartStore) => {
                state.isOpen = !state.isOpen;
            }),
        );
    },

    openCart: () => {
        set(
            produce((state: CartStore) => {
                state.isOpen = true;
            }),
        );
    },

    closeCart: () => {
        set(
            produce((state: CartStore) => {
                state.isOpen = false;
            }),
        );
    },

    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice: () => {
        return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );
    },

    getItemQuantity: (itemId: string) => {
        const item = get().items.find((item) => item.id === itemId);

        return item?.quantity ?? 0;
    },

    isItemInCart: (itemId: string) => {
        return get().items.some((item) => item.id === itemId);
    },

    getCartItemId: (
        productId: string,
        variantId: string | null,
        selectedVariations: Record<string, string>,
    ) => {
        return generateCartItemId(productId, variantId, selectedVariations);
    },
}));

