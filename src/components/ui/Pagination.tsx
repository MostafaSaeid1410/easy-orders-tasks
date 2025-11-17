import type { FC } from "react";
import { ReactSVG } from "react-svg";
import { chevronRight } from "../../assets/icons";
import Button from "./Button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
};

const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages = 5,
}) => {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i += 1) {
                pages.push(i);
            }
        } else {
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let start = currentPage - halfVisible;
            let end = currentPage + halfVisible;

            if (start < 1) {
                start = 1;

                end = maxVisiblePages;
            } else if (end > totalPages) {
                end = totalPages;

                start = totalPages - maxVisiblePages + 1;
            }

            if (start > 1) {
                pages.push(1);

                if (start > 2) {
                    pages.push("...");
                }
            }

            for (let i = start; i <= end; i += 1) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-1">
                {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                        return (
                            <button
                                key={`ellipsis-${index}`}
                                className="text-dark-500 flex h-9 w-9 items-center justify-center rounded border border-[#E4E9EE] bg-white"
                                disabled
                            >
                                ...
                            </button>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <Button
                            variant="secondary"
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`h-[44px] w-[44px] ${
                                isActive
                                    ? "border-dark-700 text-dark-900"
                                    : "text-dark-500 border-[#E4E9EE]"
                            }`}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-dark-500 flex items-center justify-center disabled:opacity-50"
            >
                <ReactSVG
                    src={chevronRight}
                    className="h-6 w-6"
                    beforeInjection={(svg) => {
                        svg.setAttribute("width", "24");

                        svg.setAttribute("height", "24");

                        svg.setAttribute("stroke", "currentColor");
                    }}
                />
            </button>
        </div>
    );
};

export { Pagination };
