import { memo, type FC } from "react";
import { ReactSVG } from "react-svg";
import { dot, starRating } from "../../../assets/icons";
import { Price } from "../../../components/ui";

export type Product = {
    id: string | number;
    image: string;
    brand: string;
    title: string;
    currentPrice: number;
    originalPrice?: number;
    rating?: number;
    soldCount?: number;
};

type ProductCardProps = {
    product: Product;
    onClick?: (product: Product) => void;
    className?: string;
};

const ProductCard: FC<ProductCardProps> = memo(
    ({ product, onClick, className = "" }) => {
        const handleClick = () => {
            onClick?.(product);
        };

        return (
            <article
                className={`flex w-full cursor-pointer flex-col transition-transform hover:scale-[1.02] ${className}`}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();

                        handleClick();
                    }
                }}
                aria-label={`View product: ${product.title}`}
            >
                <div className="relative mb-3 max-h-[200px] w-full overflow-hidden rounded-lg md:mb-4 md:max-h-[284px]">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <p className="text-dark-800 mb-1 text-sm font-semibold md:mb-1.5 md:text-lg">
                    {product.brand}
                </p>

                <div className="mb-1.5 text-base font-semibold md:mb-2 md:text-xl">
                    <Price
                        currentPrice={product.currentPrice}
                        originalPrice={product.originalPrice}
                        currency="$"
                    />
                </div>

                <p className="text-dark-400 mb-2 line-clamp-2 text-xs font-normal md:mb-3 md:text-sm">
                    {product.title}
                </p>

                <div className="mt-auto flex items-center gap-1.5 md:gap-2">
                    {product.rating !== undefined && (
                        <ReactSVG
                            src={starRating}
                            className="h-3 w-3 md:h-4 md:w-4"
                        />
                    )}

                    <span className="text-dark-950 text-xs leading-[160%] font-normal md:text-sm">
                        {product.rating}
                    </span>

                    {product.soldCount !== undefined &&
                        product.soldCount > 0 && (
                            <span className="text-dark-500 flex items-center gap-1 text-xs font-normal md:gap-2 md:text-sm">
                                <ReactSVG src={dot} className="h-1 w-1" />

                                <span>
                                    {product.soldCount.toLocaleString()} Sold
                                </span>
                            </span>
                        )}
                </div>
            </article>
        );
    },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
