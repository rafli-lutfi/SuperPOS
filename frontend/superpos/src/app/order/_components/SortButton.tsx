type SortButtonProps = {
    selectedSort: string;
    handleSortButton: (sort: string) => void;
};

export default function SortButton({ selectedSort, handleSortButton }: SortButtonProps) {
    return (
        <select
            className="px-2 py-1 rounded-lg border shadow-lg"
            value={selectedSort}
            onChange={(e) => handleSortButton(e.target.value)}
        >
            <option value="name_asc">sort by name: A to Z</option>
            <option value="name_desc">sort by name: Z to A</option>
            <option value="price_asc">sort by price: low to high </option>
            <option value="price_desc">sort by price: high to low </option>
        </select>
    );
}
