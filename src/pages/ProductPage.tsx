import { Breadcrumbs, RowDashedLine } from "../components/ui";
import {
    breadcrumbItems,
    dummyReviewData,
    dummyReviews,
    relatedProducts,
} from "../dummyData/constants";
import Gallery from "../features/productDetails/components/Gallery";
import ProductInfo from "../features/productDetails/components/ProductInfo";
import { ProductReview } from "../features/productDetails/components/ProductReviews";
import { useProductBySlugRaw } from "../features/productDetails/hooks/useProductsQuery";
import { ProductList } from "../features/productList/components";

export default function ProductPage() {
    const {
        data: product,
        isLoading,
        error,
    } = useProductBySlugRaw("clear-theme", "Sneakers12", { join: "reviews" });

    const galleryImages = product
        ? [
              {
                  id: 0,
                  src: product.thumb,
                  alt: `${product.name} - Main view`,
              },
              ...product.images.map((img, index) => ({
                  id: index + 1,
                  src: img,
                  alt: `${product.name} - View ${index + 1}`,
              })),
          ]
        : [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg">Loading product...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg text-red-600">
                    {error instanceof Error
                        ? error.message
                        : "Failed to load product"}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-10 flex flex-col gap-6 md:mb-20 md:gap-7.75">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="flex flex-col gap-10 md:gap-20">
                <div className="flex flex-col gap-6 border-gray-500 md:flex-row md:justify-between md:gap-8">
                    <Gallery images={galleryImages} />

                    <ProductInfo product={product} />
                </div>

                <RowDashedLine />

                <ProductList
                    title="Related Product"
                    products={relatedProducts}
                    viewAllLink="/products"
                />

                <RowDashedLine />

                <ProductReview
                    averageRating={dummyReviewData.averageRating}
                    totalReviews={dummyReviewData.totalReviews}
                    ratingBreakdown={dummyReviewData.ratingBreakdown}
                    reviews={dummyReviews}
                />

                <RowDashedLine />

                <ProductList
                    title="Popular this week"
                    products={relatedProducts}
                    viewAllLink="/products"
                />
            </div>
        </div>
    );
}
