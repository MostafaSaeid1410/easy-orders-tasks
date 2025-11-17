import type { FC } from "react";
import { Button } from "../../../components/ui";
import ProductCard, { type Product } from "./ProductCard";

export type ProductListProps = {
    title: string;
    products: Product[];
    viewAllLink?: string;
    viewAllLabel?: string;
    loading?: boolean;
    skeletonCount?: number;
    onProductClick?: (product: Product) => void;
    onViewAllClick?: () => void;
    className?: string;
};

const ProductList: FC<ProductListProps> = ({
    title,
    products,
    viewAllLink,
    viewAllLabel = "View All",
    loading = false,
    skeletonCount = 6,
    onProductClick,
    onViewAllClick,
    className = "",
}) => {
    return (
        <div className={`flex flex-col gap-4 md:gap-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h2 className="text-dark-950 text-xl font-semibold md:text-2xl">
                    {title}
                </h2>

                {viewAllLink && !onViewAllClick && (
                    <a
                        href={viewAllLink}
                        className="hover:text-dark-700 inline-flex items-center justify-center gap-1 bg-transparent p-0 text-sm text-black underline transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none md:text-base"
                    >
                        {viewAllLabel}
                    </a>
                )}

                {onViewAllClick && (
                    <Button variant="link" onClick={onViewAllClick}>
                        {viewAllLabel}
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-[35px] lg:grid-cols-4">
                {loading
                    ? Array.from({ length: skeletonCount }).map((_, index) => (
                          <div
                              key={index}
                              className="h-[180px] w-full animate-pulse rounded-lg bg-gray-200 md:h-[212px]"
                          />
                      ))
                    : products.map((product, index) => (
                          <ProductCard
                              key={product.id || index}
                              product={product}
                              onClick={onProductClick}
                          />
                      ))}
            </div>
        </div>
    );
};

export default ProductList;
