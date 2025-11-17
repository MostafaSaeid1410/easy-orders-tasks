import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className = "", ...props }, ref) => {
        const baseStyles =
            "h-4 w-4 cursor-pointer rounded accent-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500";

        const combinedClassName = `${baseStyles} ${className}`.trim();

        if (label) {
            return (
                <label className="flex cursor-pointer items-center gap-2">
                    <input
                        ref={ref}
                        type="checkbox"
                        className={combinedClassName}
                        {...props}
                    />

                    <span className="text-dark-900 text-sm">{label}</span>
                </label>
            );
        }

        return (
            <input
                ref={ref}
                type="checkbox"
                className={combinedClassName}
                {...props}
            />
        );
    },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
