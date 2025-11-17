import React from "react";
import { ReactSVG } from "react-svg";
import { starRating } from "../../../../assets/icons";

type RatingSummary = {
    rating: number;
    count: number;
};

type ReviewRatingBreakdownProps = {
    ratingBreakdown: RatingSummary[];
};

export const ReviewRatingBreakdown: React.FC<ReviewRatingBreakdownProps> = ({
    ratingBreakdown,
}) => {
    const maxCount = Math.max(...ratingBreakdown.map((r) => r.count), 1);

    return (
        <div className="w-full flex-1 md:w-auto">
            <div className="flex flex-col gap-2 md:gap-3">
                {ratingBreakdown.map((item) => (
                    <div key={item.rating} className="flex items-center gap-3">
                        <div className="font-600 text-dark-900 flex items-center justify-start gap-0.5 text-xs md:w-12 md:gap-1 md:text-sm">
                            <span className="flex items-center leading-none">
                                {item.rating}
                            </span>

                            <div
                                className="flex items-center"
                                style={{ lineHeight: 0 }}
                            >
                                <ReactSVG
                                    wrapper="div"
                                    src={starRating}
                                    beforeInjection={(svg) => {
                                        svg.setAttribute(
                                            "fill",
                                            "currentColor",
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-300">
                            <div
                                className={`h-full transition-all duration-300 ${
                                    item.count > 0
                                        ? "bg-dark-900"
                                        : "bg-gray-300"
                                }`}
                                style={{
                                    width: `${(item.count / maxCount) * 100}%`,
                                }}
                            />
                        </div>

                        <div className="text-dark-600 w-10 text-right text-xs md:w-12 md:text-sm">
                            {item.count}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
