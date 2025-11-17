import type { FC, ReactNode } from "react";

export type ListProps<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
    loading?: boolean;
    skeletonCount?: number;
};

const SkeletonCard: FC = () => {
    return (
        <div className="h-48 w-full animate-pulse rounded-2xl bg-gray-200" />
    );
};

export default function List<T>({
    items,
    renderItem,
    loading = false,
    skeletonCount = 6,
}: ListProps<T>) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
                <div key={index}>{renderItem(item)}</div>
            ))}
        </div>
    );
}
