import type { FC } from "react";
import { ReactSVG } from "react-svg";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
    icon: string;
    onClick?: () => void;
    badge?: number;
    className?: string;
    iconClassName?: string;
    size?: "sm" | "md" | "lg";
    ariaLabel: string;
};

const IconButton: FC<IconButtonProps> = ({
    icon,
    onClick,
    badge,
    className = "",
    iconClassName = "",
    size = "md",
    ariaLabel,
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    return (
        <button
            onClick={onClick}
            className={twMerge(
                `relative rounded-lg p-2 transition-colors hover:bg-gray-200`,
                className,
            )}
            aria-label={ariaLabel}
        >
            <ReactSVG
                src={icon}
                className={`${sizeClasses[size]} ${iconClassName}`}
            />

            {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    {badge > 99 ? "99+" : badge}
                </span>
            )}
        </button>
    );
};

export default IconButton;
