import React, { useMemo, useState } from "react";
import { ReviewList } from "./ReviewList";
import { ReviewRatingBreakdown } from "./ReviewRatingBreakdown";
import ReviewsFilter from "./ReviewsFilter";
import { ReviewSummary } from "./ReviewSummary";

export type Review = {
    id: string;
    rating: number;
    title: string;
    content: string;
    author: {
        name: string;
        avatar?: string;
    };
    date: string;
    helpful: number;
    unhelpful: number;
    hasPhoto?: boolean;
    hasVideo?: boolean;
    hasDescription?: boolean;
};

type RatingSummary = {
    rating: number;
    count: number;
};

type ProductReviewProps = {
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: RatingSummary[];
    reviews: Review[];
    onHelpful?: (reviewId: string) => void;
    onUnhelpful?: (reviewId: string) => void;
};

type ReviewTab = "all" | "withMedia" | "withDescription";

export const ProductReview: React.FC<ProductReviewProps> = ({
    averageRating,
    totalReviews,
    ratingBreakdown,
    reviews,
    onHelpful,
    onUnhelpful,
}) => {
    const [selectedTab, setSelectedTab] = useState<ReviewTab>("all");

    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, string[]>
    >({
        rating: [],
        topics: [],
    });

    const handleFilterChange = (sectionId: string, optionId: string) => {
        setSelectedFilters((prev) => {
            const sectionFilters = prev[sectionId] || [];
            const isSelected = sectionFilters.includes(optionId);

            return {
                ...prev,
                [sectionId]: isSelected
                    ? sectionFilters.filter((id) => id !== optionId)
                    : [...sectionFilters, optionId],
            };
        });
    };

    const filteredReviews = useMemo(() => {
        let filtered = [...reviews];

        if (selectedTab === "withMedia") {
            filtered = filtered.filter(
                (review) => review.hasPhoto || review.hasVideo,
            );
        } else if (selectedTab === "withDescription") {
            filtered = filtered.filter((review) => review.hasDescription);
        }

        if (selectedFilters.rating && selectedFilters.rating.length > 0) {
            const ratingValues = selectedFilters.rating.map((r) =>
                parseInt(r, 10),
            );

            filtered = filtered.filter((review) =>
                ratingValues.includes(review.rating),
            );
        }

        return filtered;
    }, [reviews, selectedTab, selectedFilters]);

    return (
        <div className="space-y-6 md:space-y-8">
            <h2 className="text-dark-950 font-600 text-xl md:text-2xl">
                Product Reviews
            </h2>

            <div className="rounded-lg [border-width:0.5px] border-dashed p-4 md:p-6">
                <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
                    <ReviewSummary
                        averageRating={averageRating}
                        totalReviews={totalReviews}
                    />

                    <ReviewRatingBreakdown ratingBreakdown={ratingBreakdown} />
                </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full shrink-0 md:w-80">
                    <ReviewsFilter
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="flex-1">
                    <ReviewList
                        reviews={filteredReviews}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        onHelpful={onHelpful}
                        onUnhelpful={onUnhelpful}
                    />
                </div>
            </div>
        </div>
    );
};
