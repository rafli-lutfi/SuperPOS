import React, { useState } from "react";

type SearchButtonProps = {
    handleSearchButton: (search: string) => void;
};

export default function SearchButton({ handleSearchButton }: SearchButtonProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearchButton(searchTerm); // Mengirim nilai pencarian saat tombol submit ditekan
    };

    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="search here..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border indent-2 shadow-lg"
            />
            <button
                type="submit"
                className="rounded-lg border bg-white px-2 py-1 shadow-lg hover:bg-interactive hover:text-white"
            >
                search
            </button>
        </form>
    );
}
