"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import CategoryForm from "../../_components/CategoryForm";
import Loading from "@/components/Loading";

export default function EditProductPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [, , type, categoryId] = pathname.split("/");

    useEffect(() => {
        if (type !== "edit" || !categoryId || Number.isNaN(Number(categoryId))) {
            router.push("/category");
        }
    }, [categoryId, type, router]);

    return (
        <div className="mx-6 w-full overflow-auto">
            <div className="my-4 flex items-center gap-4">
                <Link href={"/category"}>
                    <LeftArrowIcon />
                </Link>
                <h1 className="text-2xl font-bold">Edit Category</h1>
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                <Suspense fallback={<Loading />}>
                    <CategoryForm
                        type={type === "new" || type === "edit" ? type : "new"}
                        categoryId={Number(categoryId)}
                    />
                </Suspense>
            </div>
        </div>
    );
}

const LeftArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-5">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
);
