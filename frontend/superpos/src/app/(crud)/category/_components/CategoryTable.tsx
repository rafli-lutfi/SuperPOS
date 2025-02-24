"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/SortableHeader";
import { fetcher, deleter } from "@/libs/fetcher";
import { Category } from "@/types/Category";
import { Response } from "@/types/Response";
import { capitalizeEachWord, truncateName } from "@/utils/formatter";
import { notify } from "@/utils/notification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryTable() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

    const [sortColumn, setSortColumn] = useState<string | null>(queryParams.get("sort"));
    const [sortOrder, setSortOrder] = useState<string>(queryParams.get("order") || "asc");

    const {
        data: categoriesResponse,
        isLoading: isCategoryLoading,
        error: categoryError,
        mutate,
    } = useSWR<Response<Category[]>>(`${API_URL}/categories?${queryParams.toString()}`, fetcher);

    // Reset sort column and order if no query params
    useEffect(() => {
        if (searchParams.size === 0) {
            setSortColumn("name");
            setSortOrder("asc");
        }
    }, [searchParams]);

    // handle sorting
    const handleSortButton = (column: string) => {
        const order = sortOrder === "desc" ? "asc" : "desc";

        setSortColumn(column);
        setSortOrder(order);

        router.push(`/category?order=${order}`);
    };

    // handle delete category
    const handleDeleteButton = (categoryId: number, categoryName: string) => {
        notify.confirm("Are You Sure?", `Delete ${categoryName}`).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleter<Response<null>>(`${API_URL}/categories/${categoryId}`);
                    await mutate();
                    notify.success("Deleted!", "Category has been deleted");
                } catch (error) {
                    const errorResponse = error as Response<null>;
                    const errorMessage = errorResponse?.message || "An unknown error occurred.";

                    notify.error(undefined, errorMessage);
                }
            }
        });
    };

    // Render loading and error states
    if (isCategoryLoading) return <Loading />;
    if (categoryError) return <Error error={categoryError} />;

    return (
        <table className="w-full border-collapse bg-white">
            <thead className="sticky top-0">
                <tr className="bg-gray-100">
                    <th className="border-b border-gray-300 px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <p>No</p>
                        </div>
                    </th>
                    <SortableHeader
                        label="Category Name"
                        column="name"
                        onClick={handleSortButton}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                        align="center"
                    />
                    <th className="border-b border-gray-300 px-4 py-2 text-center">
                        <p>Actions</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {categoriesResponse?.data.map((category, index) => (
                    <CategoryRow key={category.id} category={category} index={index} onDelete={handleDeleteButton} />
                ))}
            </tbody>
        </table>
    );
}

// Reusable Category Row Component
type CategoryRowProps = {
    category: Category;
    index: number;
    onDelete: (categoryId: number, categoryName: string) => void;
};

const CategoryRow = ({ category, index, onDelete }: CategoryRowProps) => (
    <tr key={category.id} className="hover:bg-gray-50">
        <td className="border-gray-300 px-4 py-2 text-center">{index + 1}</td>
        <td className="border-gray-300 px-4 py-2 text-left">
            <p className="w-full" title={capitalizeEachWord(category.name)}>
                {truncateName(capitalizeEachWord(category.name), 50)}
            </p>
        </td>
        <td className="border-gray-300 px-4 py-2 text-center">
            <div className="flex items-center justify-center gap-2">
                <Link href={`/category/detail/${category.id}`}>
                    <button className="rounded bg-blue-500 px-2 py-1 text-white hover:brightness-90">
                        <ViewIcon />
                    </button>
                </Link>
                <Link href={`/category/edit/${category.id}`}>
                    <button className="rounded bg-highlight px-2 py-1 text-white hover:brightness-90">
                        <EditIcon />
                    </button>
                </Link>
                <button
                    className="rounded bg-error px-2 py-1 text-white hover:brightness-90"
                    onClick={() => onDelete(category.id, category.name)}
                >
                    <DeleteIcon />
                </button>
            </div>
        </td>
    </tr>
);

const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-4">
        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-4">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-4">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
);
