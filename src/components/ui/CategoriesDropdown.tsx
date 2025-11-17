import { useState } from "react";
import { Dropdown, type DropdownItem } from "./index";

const categoryItems: DropdownItem[] = [
    {
        label: "Categories",
        value: "all",
    },
    {
        label: "Technology",
        value: "technology",
    },
    {
        label: "Design",
        value: "design",
    },
    {
        label: "Business",
        value: "business",
    },
    {
        label: "Marketing",
        value: "marketing",
    },
    {
        label: "Development",
        value: "development",
    },
];

export default function CategoriesDropdown() {
    const [selectedCategory, setSelectedCategory] =
        useState<string>("All Categories");

    const handleCategorySelect = (item: DropdownItem) => {
        setSelectedCategory(item.label);
    };

    return (
        <Dropdown
            label={selectedCategory}
            items={categoryItems}
            onSelect={handleCategorySelect}
        />
    );
}
