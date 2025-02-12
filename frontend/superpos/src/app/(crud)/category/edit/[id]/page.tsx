"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { Response } from "@/types/Response";
import { fetcher } from "@/libs/fetcher";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Category } from "@/types/Category";
import CategoryForm from "../../_components/CategoryForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditProductPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [, , type, categoryId] = pathname.split("/");

    useEffect(() => {
        if (categoryId === undefined || Number.isNaN(Number(categoryId))) {
            router.push("/product");
        }
        if (type !== "edit") {
            router.push("/product");
        }
    }, [categoryId, type, router]);

    const {
        data: categoryResponse,
        isLoading: isCategoryLoading,
        error: categoryError,
    } = useSWR<Response<Category>>(`${API_URL}/categories/${categoryId}`, fetcher);

    return isCategoryLoading ? (
        <Loading />
    ) : categoryError ? (
        <Error error={categoryError} />
    ) : (
        <div className="mx-6 w-full overflow-auto">
            <div className="flex gap-4 items-center my-4">
                <Link href={"/category"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        className="w-5"
                    >
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold">Edit Category</h1>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-lg border flex items-center gap-2">
                <CategoryForm category={categoryResponse?.data} type={type as "new" | "edit"} />
            </div>
        </div>
    );
}
