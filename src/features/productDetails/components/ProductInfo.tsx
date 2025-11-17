import { useCallback, useMemo, useState } from "react";
import { ReactSVG } from "react-svg";
import { dot, starRating } from "../../../assets/icons";
import { Button, ColorSwatch, Price } from "../../../components/ui";
import { useCartStore } from "../../../stores/cart";
import type { ApiProduct } from "../api/productsApis.types";
import {
    getAvailableColorsForSize,
    getAvailableSizesForColor,
    getColorVariations,
    getSizeVariations,
    getVariantByColorAndSize,
    getVariantPrice,
} from "../utils/productHelpers";
import SizeSelector from "./SizeSelector";

type ProductInfoProps = {
    product: ApiProduct;
    defaultColor?: string;
    defaultSize?: string;
};

export default function ProductInfo({
    product,
    defaultColor,
    defaultSize,
}: ProductInfoProps) {
    const allColors = useMemo(() => getColorVariations(product), [product]);
    const allSizes = useMemo(() => getSizeVariations(product), [product]);

    const initialColor = defaultColor || allColors[0]?.name || "";
    const initialSize = defaultSize || allSizes[0] || "";

    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { addItem, openCart, getCartItemId, items } = useCartStore();

    const availableSizes = useMemo(() => {
        if (selectedColor) {
            return getAvailableSizesForColor(product, selectedColor);
        }

        return allSizes;
    }, [product, selectedColor, allSizes]);

    const availableColors = useMemo(() => {
        if (selectedSize) {
            return getAvailableColorsForSize(product, selectedSize);
        }

        return allColors;
    }, [product, selectedSize, allColors]);

    const currentVariant = useMemo(() => {
        if (selectedColor && selectedSize) {
            return getVariantByColorAndSize(
                product,
                selectedColor,
                selectedSize,
            );
        }

        return undefined;
    }, [product, selectedColor, selectedSize]);

    const { currentPrice, originalPrice } = useMemo(() => {
        return getVariantPrice(
            currentVariant,
            product.sale_price > 0 ? product.sale_price : product.price,
        );
    }, [currentVariant, product]);

    const displayedSizes =
        availableSizes.length > 0 ? availableSizes : allSizes;

    const displayedColors =
        availableColors.length > 0 ? availableColors : allColors;

    const selectedColorLabel =
        displayedColors.find(
            (c: { name: string; label?: string }) => c.name === selectedColor,
        )?.label ||
        displayedColors.find((c: { name: string }) => c.name === selectedColor)
            ?.name ||
        "";

    const handleColorChange = useCallback(
        (color: string) => {
            setSelectedColor(color);
            const sizesForColor = getAvailableSizesForColor(product, color);

            if (selectedSize && !sizesForColor.includes(selectedSize)) {
                setSelectedSize(sizesForColor[0] || "");
            }
        },
        [product, selectedSize],
    );

    const handleSizeChange = useCallback(
        (size: string) => {
            setSelectedSize(size);
            const colorsForSize = getAvailableColorsForSize(product, size);

            if (
                selectedColor &&
                !colorsForSize.find(
                    (c: { name: string }) => c.name === selectedColor,
                )
            ) {
                setSelectedColor(colorsForSize[0]?.name || "");
            }
        },
        [product, selectedColor],
    );

    const description = product.description || "";

    const truncatedDescription =
        description.length > 150 ? description.substring(0, 150) : description;

    const displayDescription = isDescriptionExpanded
        ? description
        : truncatedDescription;

    const hasVariations = allColors.length > 0 || allSizes.length > 0;

    const selectedVariations: Record<string, string> = useMemo(() => {
        const variations: Record<string, string> = {};

        if (selectedColor) variations.color = selectedColor;

        if (selectedSize) variations.size = selectedSize;

        return variations;
    }, [selectedColor, selectedSize]);

    const currentCartItemId = useMemo(() => {
        return getCartItemId(
            product.id,
            currentVariant?.id || null,
            selectedVariations,
        );
    }, [product.id, currentVariant?.id, selectedVariations, getCartItemId]);

    const isInCart = useMemo(() => {
        return items.some((item) => item.id === currentCartItemId);
    }, [items, currentCartItemId]);

    const handleAddToCart = useCallback(() => {
        if (hasVariations && !currentVariant) {
            return;
        }

        if (isInCart) {
            openCart();

            return;
        }

        setIsAddingToCart(true);

        addItem(product, currentVariant || null, selectedVariations, 1);

        openCart();

        setTimeout(() => {
            setIsAddingToCart(false);
        }, 300);
    }, [
        product,
        currentVariant,
        selectedVariations,
        hasVariations,
        isInCart,
        addItem,
        openCart,
    ]);

    const handleCheckout = useCallback(() => {
        handleAddToCart();
    }, [handleAddToCart]);

    const isVariantSelected =
        !hasVariations || (hasVariations && currentVariant !== undefined);

    const cartQuantity = useMemo(() => {
        if (!isInCart) return 0;

        const item = items.find((item) => item.id === currentCartItemId);

        return item?.quantity ?? 0;
    }, [isInCart, items, currentCartItemId]);

    return (
        <div className="flex w-full max-w-[600px] flex-col gap-5 md:gap-7">
            <div className="flex flex-col gap-4 [border-bottom-width:0.5px] border-dashed border-gray-500 pb-5 md:gap-6 md:pb-7">
                {product.categories?.[0]?.name && (
                    <p className="text-dark-300 text-sm font-medium md:text-base">
                        {product.categories[0].name}
                    </p>
                )}

                <h1 className="text-dark-950 text-2xl leading-tight font-semibold tracking-[-0.005rem] md:text-4xl">
                    {product.name}
                </h1>

                <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6">
                    <Price
                        currentPriceClassName="text-2xl md:text-[28px]"
                        currentPrice={currentPrice}
                        originalPrice={originalPrice}
                    />

                    <div className="flex items-center gap-2">
                        <span className="text-dark-500 text-base leading-1 md:text-xl">
                            1,2358 Sold
                        </span>

                        <ReactSVG src={dot} />

                        <div className="flex items-center gap-1">
                            <ReactSVG
                                src={starRating}
                                className={`text-orange-500`}
                            />

                            <span className="text-xl leading-1 font-semibold md:text-2xl">
                                4.5
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-dark-950 text-base font-semibold md:text-lg">
                        Description:
                    </h2>

                    <div className="text-dark-600 flex items-start text-sm leading-relaxed">
                        <p className="inline">
                            {displayDescription}

                            {description.length > 150 && (
                                <button
                                    onClick={() =>
                                        setIsDescriptionExpanded(
                                            !isDescriptionExpanded,
                                        )
                                    }
                                    className="ml-2 inline text-sm font-medium text-black hover:underline"
                                >
                                    {isDescriptionExpanded
                                        ? "See Less"
                                        : "See More..."}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h2>
                    <span className="text-dark-300 text-base font-medium md:text-xl">
                        Color:
                    </span>
                    &nbsp;
                    <span className="text-dark-950 text-base font-semibold md:text-lg">
                        {selectedColorLabel}
                    </span>
                </h2>

                {displayedColors.length > 0 && (
                    <ColorSwatch
                        colors={displayedColors}
                        selectedColor={selectedColor}
                        onColorChange={handleColorChange}
                    />
                )}
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-dark-300 text-base font-medium md:text-xl">
                        <span className="text-dark-300 text-base font-medium md:text-xl">
                            Size:
                        </span>
                        &nbsp;
                        <span className="text-dark-950 text-base font-semibold md:text-lg">
                            {selectedSize}
                        </span>
                    </h2>

                    <button className="text-dark-600 text-xs leading-[120%] font-medium underline md:text-sm">
                        View Size Chart
                    </button>
                </div>

                {displayedSizes.length > 0 && (
                    <SizeSelector
                        sizes={displayedSizes}
                        selectedSize={selectedSize}
                        onSizeChange={handleSizeChange}
                    />
                )}
            </div>

            <div className="flex flex-col gap-3 pt-2 md:flex-row md:gap-4">
                <Button
                    variant={isInCart ? "secondary" : "primary"}
                    className="w-full flex-1"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !isVariantSelected}
                >
                    {isAddingToCart
                        ? "Adding..."
                        : isInCart && cartQuantity > 0
                          ? `In Cart (${cartQuantity})`
                          : "Add To Cart"}
                </Button>

                <Button
                    variant="secondary"
                    className="w-full flex-1"
                    onClick={handleCheckout}
                    disabled={isAddingToCart || !isVariantSelected}
                >
                    Checkout Now
                </Button>
            </div>

            <div className="mt-[34px]">
                <a
                    href="#"
                    className="text-dark-400 block text-sm leading-[120%] underline"
                >
                    Delivery T&C
                </a>
            </div>
        </div>
    );
}
