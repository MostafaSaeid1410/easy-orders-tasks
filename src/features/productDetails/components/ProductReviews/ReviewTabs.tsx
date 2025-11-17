import React from "react";
import { filterIcon } from "../../../../assets/icons";
import { Button, IconButton } from "../../../../components/ui";

export type ReviewTab = "all" | "withMedia" | "withDescription";

type ReviewTabsProps = {
    activeTab: ReviewTab;
    onTabChange: (tab: ReviewTab) => void;
    onFilterClick?: () => void;
};

type tab = { id: ReviewTab; label: string };

const tabs: tab[] = [
    { id: "all", label: "All Reviews" },
    { id: "withMedia", label: "With Photo & Video" },
    { id: "withDescription", label: "With Description" },
];

export const ReviewTabs: React.FC<ReviewTabsProps> = ({
    activeTab,
    onTabChange,
    onFilterClick,
}) => {
    return (
        <div className="flex justify-between md:justify-start">
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <Button
                            key={tab.id}
                            type="button"
                            variant="secondary"
                            onClick={() => onTabChange(tab.id)}
                            className={`border-gray-250 text-dark-900 rounded-lg text-xs leading-[160%] font-medium md:text-sm ${isActive && "border-dark-700 bg-gray-200"} `}
                        >
                            {tab.label}
                        </Button>
                    );
                })}
            </div>

            <IconButton
                icon={filterIcon}
                onClick={onFilterClick}
                variant="secondary"
                ariaLabel="Filter reviews"
                className="self-start rounded-[8px] border-[#E4E9EE] md:hidden"
            />
        </div>
    );
};
