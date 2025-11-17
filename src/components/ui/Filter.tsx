import { useState, type FC } from "react";
import { ReactSVG } from "react-svg";
import { chevronUp } from "../../assets/icons";
import DottedWrapper from "./DottedWrapper";

export type FilterOption = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    count?: number;
};

export type FilterSection = {
    id: string;
    title: string;
    options: FilterOption[];
    collapsible?: boolean;
    defaultExpanded?: boolean;
};

export type FilterProps = {
    title: string;
    sections: FilterSection[];
    selectedFilters: Record<string, string[]>;
    onChange: (sectionId: string, optionId: string) => void;
    onClear?: () => void;
    className?: string;
};

const Filter: FC<FilterProps> = ({
    title,
    sections,
    selectedFilters,
    onChange,
    className = "",
}) => {
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >(
        sections.reduce(
            (acc, section) => ({
                ...acc,
                [section.id]: section.defaultExpanded ?? true,
            }),
            {},
        ),
    );

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    const isChecked = (sectionId: string, optionId: string) => {
        return selectedFilters[sectionId]?.includes(optionId) || false;
    };

    return (
        <DottedWrapper className={className}>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-dark-950 text-xl leading-[1.2] font-semibold">
                    {title}
                </h2>
            </div>

            <div className="space-y-6">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="border-b border-gray-300 pb-6 last:border-0 last:pb-0"
                    >
                        <button
                            onClick={() =>
                                section.collapsible !== false &&
                                toggleSection(section.id)
                            }
                            className="group mb-4 flex w-full items-center justify-between"
                        >
                            <h3 className="text-base font-semibold text-gray-600">
                                {section.title}
                            </h3>

                            {section.collapsible !== false && (
                                <ReactSVG src={chevronUp} />
                            )}
                        </button>

                        {expandedSections[section.id] && (
                            <div className="space-y-3">
                                {section.options.map((option) => (
                                    <label
                                        key={option.id}
                                        className="group flex cursor-pointer items-center gap-3"
                                    >
                                        <div className="relative flex items-center justify-start">
                                            <input
                                                type="checkbox"
                                                checked={isChecked(
                                                    section.id,
                                                    option.id,
                                                )}
                                                onChange={() =>
                                                    onChange(
                                                        section.id,
                                                        option.id,
                                                    )
                                                }
                                                className="h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-500 transition-colors duration-200 checked:border-orange-500 checked:bg-orange-500"
                                            />

                                            {isChecked(
                                                section.id,
                                                option.id,
                                            ) && (
                                                <svg
                                                    className="pointer-events-none absolute top-1 left-1 h-3 w-3 text-white"
                                                    fill="none"
                                                    strokeWidth="3"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {option.icon}

                                            <span className="group-hover:text-dark-950 text-gray-600 transition-colors">
                                                {option.label}
                                            </span>
                                        </div>

                                        {option.count !== undefined && (
                                            <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-500">
                                                {option.count}
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </DottedWrapper>
    );
};

export default Filter;
