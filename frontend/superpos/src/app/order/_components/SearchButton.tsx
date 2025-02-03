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
                className="indent-2 border shadow-lg rounded-lg"
            />
            <button
                type="submit"
                className="px-2 py-1 bg-white border shadow-lg rounded-lg hover:bg-interactive hover:text-white"
            >
                search
            </button>
        </form>
    );
}
