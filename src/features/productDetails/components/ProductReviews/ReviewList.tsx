import React, { useMemo, useState } from "react";
import { Pagination } from "../../../../components/ui";
import { ReviewCard } from "./ReviewCard";
import { ReviewTabs, type ReviewTab } from "./ReviewTabs";

type Review = {
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
};

type ReviewListProps = {
    reviews: Review[];
    totalCount?: number;
    itemsPerPage?: number;
    selectedTab?: ReviewTab;
    onTabChange?: (tab: ReviewTab) => void;
    onHelpful?: (reviewId: string) => void;
    onUnhelpful?: (reviewId: string) => void;
    onFilterClick?: () => void;
};

export const ReviewList: React.FC<ReviewListProps> = ({
    reviews,
    itemsPerPage = 4,
    selectedTab = "all",
    onTabChange,
    onHelpful,
    onUnhelpful,
    onFilterClick,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [internalTab, setInternalTab] = useState<ReviewTab>("all");

    const activeTab = selectedTab ?? internalTab;

    const handleTabChange = (tab: ReviewTab) => {
        setCurrentPage(1);

        if (onTabChange) {
            onTabChange(tab);
        } else {
            setInternalTab(tab);
        }
    };

    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const validCurrentPage = useMemo(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            return 1;
        }

        return currentPage;
    }, [currentPage, totalPages]);

    const paginatedReviews = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return reviews.slice(startIndex, endIndex);
    }, [reviews, validCurrentPage, itemsPerPage]);

    return (
        <div className="space-y-4 md:space-y-6">
            <div>
                <h3 className="text-dark-950 font-600 mb-3 text-lg md:mb-4 md:text-xl">
                    Review Lists
                </h3>

                <ReviewTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    onFilterClick={onFilterClick}
                />
            </div>

            <div className="space-y-4 md:space-y-6">
                {paginatedReviews.length > 0 ? (
                    paginatedReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            {...review}
                            onHelpful={() => onHelpful?.(review.id)}
                            onUnhelpful={() => onUnhelpful?.(review.id)}
                        />
                    ))
                ) : (
                    <div className="text-dark-500 flex items-center justify-center py-8 text-sm md:py-12 md:text-base">
                        No reviews found
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        currentPage={validCurrentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};
