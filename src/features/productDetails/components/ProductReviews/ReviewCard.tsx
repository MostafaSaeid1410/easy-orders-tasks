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
        author,
        date,
        helpful,
        unhelpful,
        onHelpful,
        onUnhelpful,
    }) => {
        return (
            <div className="flex items-start justify-between" key={id}>
                <div className="flex flex-col gap-4">
                    <Rating rating={rating} showNumber={false} size="sm" />

                    <div className="flex flex-col gap-1">
                        <h4 className="text-dark-900 text-lg md:text-sm">
                            {title}
                        </h4>

                        {/* {content && (
                            <p className="text-dark-600 text-xs leading-relaxed md:text-sm">
                                {content}
                            </p>
                        )} */}

                        <p className="text-gray-600 md:text-xs">{date}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {author.avatar ? (
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="h-7 w-7 rounded-full object-cover md:h-8 md:w-8"
                            />
                        ) : (
                            <div className="text-dark-700 flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-[10px] md:h-8 md:w-8 md:text-xs">
                                {author.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <span className="text-dark-950 text-xs leading-[160%] md:text-sm">
                            {author.name}
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 self-end">
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
                                <span className="text-dark-900">{helpful}</span>
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
                                <span className="text-dark-900">
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
