import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { chevronDown as chevronIcon } from "../../assets/icons";

export type DropdownItem = {
    label: string;
    value: string;
    onClick?: () => void;
};

type DropdownProps = {
    label: string;
    items: DropdownItem[];
    className?: string;
    onSelect?: (item: DropdownItem) => void;
};

const Dropdown = ({
    label,
    items,
    className = "",
    onSelect,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleItemClick = (item: DropdownItem) => {
        if (item.onClick) {
            item.onClick();
        }

        if (onSelect) {
            onSelect(item);
        }
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={className}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="hover:text-dark-700 inline-flex items-center gap-2 rounded text-black transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            >
                <span>{label}</span>

                <ReactSVG
                    src={chevronIcon}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 z-50 mt-2 min-w-[200px] rounded border border-gray-300 bg-white shadow-lg">
                    <ul className="py-2">
                        {items.map((item, index) => (
                            <li key={item.value || index}>
                                <button
                                    type="button"
                                    onClick={() => handleItemClick(item)}
                                    className="w-full px-4 py-2 text-left text-black transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
