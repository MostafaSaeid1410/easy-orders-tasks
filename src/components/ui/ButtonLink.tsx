import { twMerge } from "tailwind-merge";

type ButtonLinkProps = {
    url: string;
    label: string;
    className?: string;
} & React.LiHTMLAttributes<HTMLLIElement>;

export default function ButtonLink({
    url,
    label,
    className = "",
    children,
    ...props
}: ButtonLinkProps) {
    return (
        <li
            className={twMerge(
                "rounded-full bg-white p-2.25 transition hover:opacity-70",
                className,
            )}
            {...props}
        >
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
            >
                {children}
            </a>
        </li>
    );
}
