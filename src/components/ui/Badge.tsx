import type { FC } from "react";

type BadgeProps = {
    count: number;
    className?: string;
};

const Badge: FC<BadgeProps> = ({ count, className = "" }) => {
    if (count <= 0) return null;

    return (
        <span
            className={`rounded-full bg-black px-2 py-1 text-xs font-semibold text-white ${className}`}
        >
            {count > 99 ? "99+" : count}
        </span>
    );
};

export default Badge;
