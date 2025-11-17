import type { FC, ReactNode } from "react";

type DottedWrapperProps = {
    children: ReactNode;
    className?: string;
};

const DottedWrapper: FC<DottedWrapperProps> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`rounded-lg border border-dashed border-gray-400 p-6 ${className}`}
        >
            {children}
        </div>
    );
};

export default DottedWrapper;
