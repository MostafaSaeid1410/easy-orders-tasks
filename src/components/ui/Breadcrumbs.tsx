import { Fragment, type FC } from "react";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className = "" }) => {
    return (
        <nav
            className={`flex items-center gap-1.5 text-xs font-medium md:gap-2 md:text-sm ${className}`}
            aria-label="Breadcrumb"
        >
            {items.map((item, index) => (
                <Fragment
                    key={`${item.label}-${item.href || "current"}-${index}`}
                >
                    {index > 0 && <span className="text-dark-400">›</span>}

                    {item.href ? (
                        <a
                            href={item.href}
                            className="hover:text-dark-900 text-dark-300 whitespace-nowrap transition-colors"
                        >
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-dark-800 leading-[160%] font-medium whitespace-nowrap">
                            {item.label}
                        </span>
                    )}
                </Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
