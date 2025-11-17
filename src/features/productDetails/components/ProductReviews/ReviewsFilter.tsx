import { useState } from "react";
import { ReactSVG } from "react-svg";
import { starRating } from "../../../../assets/icons";
import { Filter, type FilterSection } from "../../../../components/ui";

const StarRating: React.FC<{ rating: number; iconSrc: string }> = ({
    rating,
    iconSrc,
}) => (
    <div className="flex items-center gap-1">
        <ReactSVG
            wrapper="div"
            src={iconSrc}
            className="h-[20px] w-[20px] text-orange-500"
            beforeInjection={(svg) => {
                svg.setAttribute("fill", "currentColor");
            }}
        />

        <span className="text-dark-950 text-sm font-medium">{rating}</span>
    </div>
);

type ReviewsFilterProps = {
    selectedFilters?: Record<string, string[]>;
    onFilterChange?: (sectionId: string, optionId: string) => void;
};

export default function ReviewsFilter(
    {
        selectedFilters: controlledFilters,
        onFilterChange: controlledOnChange,
    }: ReviewsFilterProps = {} as ReviewsFilterProps,
) {
    const [internalFilters, setInternalFilters] = useState<
        Record<string, string[]>
    >({
        rating: [],
        topics: [],
    });

    const selectedFilters = controlledFilters ?? internalFilters;

    const handleFilterChange =
        controlledOnChange ??
        ((sectionId: string, optionId: string) => {
            setInternalFilters((prev) => {
                const sectionFilters = prev[sectionId] || [];
                const isSelected = sectionFilters.includes(optionId);

                return {
                    ...prev,
                    [sectionId]: isSelected
                        ? sectionFilters.filter((id) => id !== optionId)
                        : [...sectionFilters, optionId],
                };
            });
        });

    const filterSections: FilterSection[] = [
        {
            id: "rating",
            title: "Rating",
            collapsible: true,
            defaultExpanded: true,
            options: [
                {
                    id: "5",
                    label: "",
                    icon: <StarRating iconSrc={starRating} rating={5} />,
                },
                {
                    id: "4",
                    label: "",
                    icon: <StarRating iconSrc={starRating} rating={4} />,
                },
                {
                    id: "3",
                    label: "",
                    icon: <StarRating iconSrc={starRating} rating={3} />,
                },
                {
                    id: "2",
                    label: "",
                    icon: <StarRating iconSrc={starRating} rating={2} />,
                },
                {
                    id: "1",
                    label: "",
                    icon: <StarRating iconSrc={starRating} rating={1} />,
                },
            ],
        },
        {
            id: "topics",
            title: "Review Topics",
            collapsible: true,
            defaultExpanded: true,
            options: [
                { id: "quality", label: "Product Quality" },
                { id: "service", label: "Seller Services" },
                { id: "price", label: "Product Price" },
                { id: "shipment", label: "Shipment" },
                { id: "match", label: "Match with Description" },
            ],
        },
    ];

    const handleClearAll = () => {
        if (controlledFilters) {
            filterSections.forEach((section) => {
                section.options.forEach((option) => {
                    if (selectedFilters[section.id]?.includes(option.id)) {
                        handleFilterChange(section.id, option.id);
                    }
                });
            });
        } else {
            setInternalFilters({});
        }
    };

    return (
        <Filter
            title="Reviews Filter"
            sections={filterSections}
            selectedFilters={selectedFilters}
            onChange={handleFilterChange}
            onClear={handleClearAll}
        />
    );
}
