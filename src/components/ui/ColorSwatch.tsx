import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type Color = {
    name: string;
    value: string;
    label?: string;
};

type ColorSwatchProps = {
    colors: Color[];
    selectedColor: string;
    onColorChange: (colorName: string) => void;
    className?: string;
};

const ColorSwatch: FC<ColorSwatchProps> = ({
    colors,
    selectedColor,
    onColorChange,
    className = "",
}) => {
    const isImageUrl = (value: string) => {
        return value.startsWith("http://") || value.startsWith("https://");
    };

    return (
        <div className={twMerge("flex gap-[14px]", className)}>
            {colors.map((color) => {
                const isSelected = selectedColor === color.name;
                const isImage = isImageUrl(color.value);

                return (
                    <button
                        key={color.name}
                        onClick={() => onColorChange(color.name)}
                        className={`relative h-12 w-12 overflow-hidden rounded-lg border-2 p-[6px] transition-all ${
                            isSelected
                                ? "border-black"
                                : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={isImage ? {} : { backgroundColor: color.value }}
                        title={color.label || color.name}
                    >
                        {isImage && (
                            <img
                                src={color.value}
                                alt={color.label || color.name}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ColorSwatch;
