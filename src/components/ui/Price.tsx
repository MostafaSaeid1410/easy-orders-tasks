import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type PriceProps = {
    currentPrice: number;
    originalPrice?: number;
    currency?: string;
    className?: string;
    currentPriceClassName?: string;
};

const Price: FC<PriceProps> = ({
    currentPrice,
    originalPrice,
    currency = "£",
    className = "",
    currentPriceClassName = "",
}) => {
    const hasDiscount = originalPrice && originalPrice > currentPrice;

    return (
        <div className={twMerge("flex items-center gap-2", className)}>
            {hasDiscount && (
                <span className="text-dark-500 text-lg line-through">
                    {currency}

                    {originalPrice.toFixed(2)}
                </span>
            )}

            <span
                className={twMerge(
                    "text-dark-900 font-bold",
                    currentPriceClassName,
                )}
            >
                {currency}

                {currentPrice.toFixed(2)}
            </span>
        </div>
    );
};

export default Price;
