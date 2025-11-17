import type { ChangeEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { search as defaultSearchIcon } from "../../assets/icons";
import { IconButton } from "./index";

type SearchInputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    searchIcon?: string;
    iconSize?: "sm" | "md" | "lg";
};

export default function SearchInput({
    placeholder = "Search...",
    value: controlledValue,
    onChange,
    onSearch,
    searchIcon,
    iconSize = "md",
}: SearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const inputValue = isControlled ? controlledValue : internalValue;

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                if (inputValue === "") {
                    setIsOpen(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, inputValue]);

    const handleIconClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            onSearch?.(inputValue.trim());
        }

        if (e.key === "Escape") {
            setIsOpen(false);

            if (!isControlled) setInternalValue("");
        }
    };

    return (
        <div className="relative flex items-center">
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`absolute top-1/2 right-10 origin-right -translate-y-1/2 rounded-lg bg-gray-100 px-4 py-2 text-white placeholder-gray-500 ring-0 transition-all duration-300 ease-in-out outline-none focus:ring-2 focus:ring-orange-500/50 focus:outline-none ${isOpen ? "w-64 scale-x-100 opacity-100" : "w-0 scale-x-0 p-0 opacity-0"} `}
                style={{
                    transformOrigin: "right center",
                }}
                aria-label="Search"
            />

            <IconButton
                icon={searchIcon ?? defaultSearchIcon}
                onClick={handleIconClick}
                size={iconSize}
                ariaLabel="Toggle search"
                className={`z-10 transition-all duration-300 ${isOpen ? "text-orange-500" : "text-gray-400 hover:text-white"}`}
                iconClassName="transition-colors"
            />
        </div>
    );
}
