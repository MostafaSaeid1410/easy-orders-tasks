import React from "react";
import { Rating } from "../../../../components/ui";

const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
        const thousands = count / 1000;

        return `${thousands.toFixed(2)}k`.replace(".00", "");
    }

    return count.toLocaleString();
};

type ReviewSummaryProps = {
    averageRating: number;
    totalReviews: number;
};

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({
    averageRating,
    totalReviews,
}) => {
    return (
        <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-500 md:h-21 md:w-21">
                <span className="font-600 text-dark-950 text-lg md:text-xl">
                    {averageRating.toFixed(1)}
                </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 md:gap-2">
                <div>
                    <Rating
                        rating={averageRating}
                        showNumber={false}
                        size="md"
                    />
                </div>

                <div className="text-dark-600 text-center text-xs md:text-sm">
                    {`from ${formatReviewCount(totalReviews)} reviews`}
                </div>
            </div>
        </div>
    );
};
