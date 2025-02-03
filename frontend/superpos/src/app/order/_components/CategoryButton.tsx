import { Category } from "@/types/Category";
import { capitalizeEachWord } from "@/utils/formatter";
import React from "react";

type CategoryButtonProps = {
    categories: Category[] | undefined;
    selectedCategory: string;
    handleCategoryButton: (categoryName: string) => void;
};

export default function CategoryButtons({ categories, selectedCategory, handleCategoryButton }: CategoryButtonProps) {
    return (
        <select
            value={selectedCategory}
            className="px-2 py-1 rounded-lg border shadow-lg"
            onChange={(e) => handleCategoryButton(e.target.value)}
        >
            <option value={""}>All Items</option>
            {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                    {capitalizeEachWord(category.name)}
                </option>
            ))}
        </select>
    );
}
