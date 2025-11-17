import React, { memo } from "react";
import { dislikeIcon, likeIcon } from "../../../../assets/icons";
import { Button, Rating } from "../../../../components/ui";

type ReviewCardProps = {
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
    onHelpful?: () => void;
    onUnhelpful?: () => void;
};

export const ReviewCard: React.FC<ReviewCardProps> = memo(
    ({
        id,
        rating,
        title,
        content,
        author,
        date,
        helpful,
        unhelpful,
        onHelpful,
        onUnhelpful,
    }) => {
        return (
            <div
                className="flex flex-col gap-3 border-b border-gray-300 pb-4 md:flex-row md:gap-4 md:pb-6"
                key={id}
            >
                <div className="flex-1 space-y-2 md:space-y-3">
                    <div>
                        <Rating rating={rating} showNumber={false} size="sm" />
                    </div>

                    <div>
                        <h4 className="font-600 text-dark-900 text-sm md:text-base">
                            {title}
                        </h4>
                    </div>

                    {content && (
                        <p className="text-dark-600 text-xs leading-relaxed md:text-sm">
                            {content}
                        </p>
                    )}

                    <p className="text-dark-500 text-[10px] md:text-xs">
                        {date}
                    </p>

                    <div className="flex items-center gap-2">
                        {author.avatar ? (
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="h-7 w-7 rounded-full object-cover md:h-8 md:w-8"
                            />
                        ) : (
                            <div className="font-600 text-dark-700 flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-[10px] md:h-8 md:w-8 md:text-xs">
                                {author.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <span className="font-600 text-dark-900 text-xs md:text-sm">
                            {author.name}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-start gap-3 md:flex-col md:items-end md:gap-2">
                    <div className="flex gap-2 md:gap-3">
                        <Button
                            variant="secondary"
                            type="button"
                            className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-1.5 text-xs md:gap-2 md:px-4 md:py-2 md:text-sm"
                            onClick={onHelpful}
                            aria-label={`Mark as helpful, ${helpful} people found this helpful`}
                            leftIcon={likeIcon}
                        >
                            {helpful > 0 && (
                                <span className="text-dark-900 font-600">
                                    {helpful}
                                </span>
                            )}
                        </Button>

                        <Button
                            variant="secondary"
                            type="button"
                            className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-1.5 text-xs md:gap-2 md:px-4 md:py-2 md:text-sm"
                            onClick={onUnhelpful}
                            aria-label={`Mark as unhelpful, ${unhelpful} people found this unhelpful`}
                            leftIcon={dislikeIcon}
                        >
                            {unhelpful > 0 && (
                                <span className="text-dark-900 font-600">
                                    {unhelpful}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        );
    },
);

ReviewCard.displayName = "ReviewCard";
