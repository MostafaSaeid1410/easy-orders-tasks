import type { FC } from "react";
import { ReactSVG } from "react-svg";
import { twMerge } from "tailwind-merge";
import { starRating } from "../../assets/icons";

type RatingProps = {
    rating: number;
    maxRating?: number;
    showNumber?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
};

const Rating: FC<RatingProps> = ({
    rating,
    maxRating = 5,
    showNumber = true,
    size = "md",
    className = "",
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    return (
        <div
            className={twMerge(
                "flex items-center justify-between gap-1",
                className,
            )}
        >
            <div className="flex gap-1">
                {[...Array(maxRating)].map((_, index) => {
                    const fillPercentage =
                        Math.min(Math.max(rating - index, 0), 1) * 100;

                    return (
                        <div key={index} className="relative">
                            <ReactSVG
                                wrapper="div"
                                src={starRating}
                                className={`${sizeClasses[size]}`}
                            />

                            <div
                                className="absolute top-0 left-0 overflow-hidden"
                                style={{ width: `${fillPercentage}%` }}
                            >
                                <ReactSVG
                                    wrapper="div"
                                    src={starRating}
                                    className={`${sizeClasses[size]} text-orange-500`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {showNumber && (
                <span className="text-dark-900 ml-1 text-sm font-semibold">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default Rating;
