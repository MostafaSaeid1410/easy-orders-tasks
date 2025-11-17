import type { Product } from "../../productList/components";
import type { ApiProduct } from "../api/productsApis.types";

export function getColorVariations(
    product: ApiProduct,
): Array<{ name: string; value: string; label: string }> {
    const colorVariation = product.variations.find((v) => v.name === "color");

    if (!colorVariation || colorVariation.type !== "image") {
        return [];
    }

    return colorVariation.props
        .filter((prop) => prop.value)
        .map((prop) => ({
            name: prop.name,
            value: prop.value!,
            label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        }));
}

export function getSizeVariations(product: ApiProduct): string[] {
    const sizeVariation = product.variations.find((v) => v.name === "size");

    if (!sizeVariation) {
        return [];
    }

    return sizeVariation.props
        .map((prop) => prop.name)
        .sort((a, b) => {
            const numA = Number(a);
            const numB = Number(b);

            if (!isNaN(numA) && !isNaN(numB)) {
                return numA - numB;
            }

            return a.localeCompare(b);
        });
}

export function getVariantByColorAndSize(
    product: ApiProduct,
    color: string,
    size: string,
): ApiProduct["variants"][0] | undefined {
    return product.variants.find((variant) => {
        const hasColor = variant.variation_props.some(
            (vp) => vp.variation === "color" && vp.variation_prop === color,
        );

        const hasSize = variant.variation_props.some(
            (vp) => vp.variation === "size" && vp.variation_prop === size,
        );

        return hasColor && hasSize;
    });
}

export function getVariantPrice(
    variant: ApiProduct["variants"][0] | undefined,
    fallbackPrice: number,
): { currentPrice: number; originalPrice?: number } {
    if (!variant) {
        return { currentPrice: fallbackPrice };
    }

    const currentPrice =
        variant.sale_price > 0 ? variant.sale_price : variant.price;

    const originalPrice =
        variant.sale_price > 0 && variant.sale_price < variant.price
            ? variant.price
            : undefined;

    return { currentPrice, originalPrice };
}

export function getAvailableSizesForColor(
    product: ApiProduct,
    color: string,
): string[] {
    const variantsWithColor = product.variants.filter((variant) =>
        variant.variation_props.some(
            (vp) => vp.variation === "color" && vp.variation_prop === color,
        ),
    );

    const sizes = new Set<string>();
    variantsWithColor.forEach((variant) => {
        const sizeProp = variant.variation_props.find(
            (vp) => vp.variation === "size",
        );

        if (sizeProp) {
            sizes.add(sizeProp.variation_prop);
        }
    });

    return Array.from(sizes).sort((a, b) => {
        const numA = Number(a);
        const numB = Number(b);

        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }

        return a.localeCompare(b);
    });
}

export function getAvailableColorsForSize(
    product: ApiProduct,
    size: string,
): Array<{ name: string; value: string; label: string }> {
    const variantsWithSize = product.variants.filter((variant) =>
        variant.variation_props.some(
            (vp) => vp.variation === "size" && vp.variation_prop === size,
        ),
    );

    const colorNames = new Set<string>();
    variantsWithSize.forEach((variant) => {
        const colorProp = variant.variation_props.find(
            (vp) => vp.variation === "color",
        );

        if (colorProp) {
            colorNames.add(colorProp.variation_prop);
        }
    });

    const colorVariation = product.variations.find((v) => v.name === "color");

    if (!colorVariation) {
        return [];
    }

    return colorVariation.props
        .filter((prop) => colorNames.has(prop.name) && prop.value)
        .map((prop) => ({
            name: prop.name,
            value: prop.value!,
            label: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
        }));
}

export function calculateAverageRating(
    reviews?: ApiProduct["reviews"],
): number | undefined {
    if (!reviews || reviews.length === 0) {
        return undefined;
    }

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);

    return Number((sum / reviews.length).toFixed(1));
}

export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
    const rating = calculateAverageRating(apiProduct.reviews);

    return {
        id: apiProduct.id,
        image: apiProduct.thumb || apiProduct.images?.[0] || "",
        brand: apiProduct.categories?.[0]?.name || "Unknown Brand",
        title: apiProduct.name,
        currentPrice:
            apiProduct.sale_price > 0
                ? apiProduct.sale_price
                : apiProduct.price,
        originalPrice:
            apiProduct.sale_price > 0 &&
            apiProduct.sale_price < apiProduct.price
                ? apiProduct.price
                : undefined,
        rating,
        soldCount: undefined,
    };
};
