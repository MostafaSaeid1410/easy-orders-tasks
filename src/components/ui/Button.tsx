import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { ReactSVG } from "react-svg";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "link" | "transparent";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    leftIcon?: string;
    rightIcon?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            className = "",
            children,
            leftIcon,
            rightIcon,
            ...props
        },
        ref,
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-xl rounded-lg";

        const variantStyles = {
            primary:
                "bg-dark-900 text-white font-semibold leading-[120%] hover:bg-dark-800 focus:ring-dark-900 px-6 py-3 ",
            secondary:
                "bg-white text-dark-700 border border-gray-400 hover:bg-gray-200 focus:ring-black px-6 py-3 ",
            link: "bg-transparent text-dark-700 hover:text-dark-700 underline focus:ring-black p-0",
            transparent:
                "bg-transparent border-none text-dark-700 hover:text-dark-700 focus:ring-transparent p-0",
        };

        const combinedClassName = twMerge(
            baseStyles,
            variantStyles[variant],
            className,
        );

        const iconClassName = "flex-shrink-0";

        return (
            <button ref={ref} className={combinedClassName} {...props}>
                {leftIcon && (
                    <ReactSVG src={leftIcon} className={iconClassName} />
                )}

                {children && <span>{children}</span>}

                {rightIcon && (
                    <ReactSVG src={rightIcon} className={iconClassName} />
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
