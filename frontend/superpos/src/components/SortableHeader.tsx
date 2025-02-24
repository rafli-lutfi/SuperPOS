import clsx from "clsx";

type SortableHeaderProps = {
    label: string;
    column: string;
    sortColumn: string | null;
    sortOrder: string;
    onClick: (column: string) => void;
    align?: "start" | "center" | "end";
    className?: string;
};

export default function SortableHeader({
    label,
    column,
    sortColumn,
    sortOrder,
    onClick,
    align = "start",
    className,
}: SortableHeaderProps) {
    const isActive = sortColumn === column;
    const icon =
        isActive && sortOrder === "desc" ? <SortDescIcon isActive={isActive} /> : <SortAscIcon isActive={isActive} />;

    return (
        <th className={clsx("border-b border-gray-300 px-4 py-2", className)}>
            <div className={`flex items-center justify-${align} gap-2`}>
                <p>{label}</p>
                <button onClick={() => onClick(column)} className={`${isActive ? "border border-black" : ""}`}>
                    {icon}
                </button>
            </div>
        </th>
    );
}

const SortAscIcon = (isActive: { isActive: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className={`w-5 ${isActive ? "text-black" : "text-gray-500"}`}
    >
        <path d="m280-400 200-200 200 200H280Z" />
    </svg>
);

const SortDescIcon = (isActive: { isActive: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        className={`w-5 ${isActive ? "text-black" : "text-gray-500"}`}
    >
        <path d="M480-360 280-560h400L480-360Z" />
    </svg>
);
