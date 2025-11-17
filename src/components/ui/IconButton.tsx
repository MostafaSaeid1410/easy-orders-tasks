import type { FC } from "react";
import { ReactSVG } from "react-svg";
import { twMerge } from "tailwind-merge";

type IconButtonVariant = "primary" | "secondary" | "transparent";

type IconButtonProps = {
    icon: string;
    onClick?: () => void;
    badge?: number;
    className?: string;
    iconClassName?: string;
    size?: "sm" | "md" | "lg";
    variant?: IconButtonVariant;
    ariaLabel: string;
};

const IconButton: FC<IconButtonProps> = ({
    icon,
    onClick,
    badge,
    className = "",
    iconClassName = "",
    size = "md",
    variant = "transparent",
    ariaLabel,
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const variantStyles = {
        primary: "bg-dark-900 text-white hover:bg-dark-800",
        secondary: "bg-white border hover:bg-gray-200",
        transparent: "hover:bg-gray-200",
    };

    return (
        <button
            onClick={onClick}
            className={twMerge(
                `relative flex justify-center rounded-lg p-2 transition-colors ${variantStyles[variant]}`,
                className,
            )}
            aria-label={ariaLabel}
        >
            <ReactSVG
                src={icon}
                wrapper="svg"
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
