import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type SizeSelectorProps = {
    sizes: string[];
    selectedSize: string;
    onSizeChange: (size: string) => void;
    className?: string;
};

const SizeSelector: FC<SizeSelectorProps> = ({
    sizes,
    selectedSize,
    onSizeChange,
    className = "",
}) => {
    return (
        <div className={twMerge("flex flex-wrap gap-[15px]", className)}>
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => onSizeChange(size)}
                    className={`rounded-lg border-2 px-[30.5px] py-2 font-semibold transition-all ${
                        selectedSize === size
                            ? "border-dark-700 text-dark-900 bg-gray-200"
                            : "text-dark-900 border-gray-250 bg-white hover:border-gray-400"
                    }`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

export default SizeSelector;
