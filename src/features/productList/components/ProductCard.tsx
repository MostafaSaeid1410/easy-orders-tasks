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
                className={`mx-auto flex w-full max-w-[157px] cursor-pointer flex-col transition-transform hover:scale-[1.02] md:mx-0 md:max-w-none ${className}`}
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
                <div className="relative mb-3 h-[210px] w-full overflow-hidden rounded-[8px] bg-[#F7F7F9] md:mb-4 md:h-[284px] md:rounded-xl md:bg-transparent">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <p className="mb-1 text-[13px] leading-[18px] font-semibold text-[#19191D] md:mb-1.5 md:text-lg md:leading-[26px]">
                    {product.brand}
                </p>

                <div className="mb-1.5 text-[20px] leading-[24px] font-semibold md:mb-2 md:text-xl md:leading-[28px]">
                    <Price
                        currentPrice={product.currentPrice}
                        originalPrice={product.originalPrice}
                        currency="$"
                    />
                </div>

                <p className="md:text-dark-400 mb-2 line-clamp-2 text-[12px] leading-[150%] font-normal text-[#6D6D7B] md:mb-3 md:text-sm">
                    {product.title}
                </p>

                <div className="mt-auto flex items-center gap-1 md:gap-2">
                    {product.rating !== undefined && (
                        <ReactSVG wrapper="div" src={starRating} />
                    )}

                    <span className="md:text-dark-950 text-[12px] leading-[150%] font-medium text-[#19191D] md:text-sm">
                        {product.rating?.toString().replace(".", ",")}
                    </span>

                    {product.soldCount !== undefined &&
                        product.soldCount > 0 && (
                            <span className="md:text-dark-500 flex items-center gap-1 text-[12px] leading-[150%] font-normal text-[#6D6D7B] md:gap-2 md:text-sm">
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
