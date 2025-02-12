"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import CategoryForm from "../_components/CategoryForm";

export default function CreateCategoryPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [, , type] = pathname.split("/");

    useEffect(() => {
        if (type !== "new") {
            router.push("/category");
        }
    }, [type, router]);

    return (
        <div className="mx-6 w-full">
            <div className="flex gap-4 items-center my-4">
                <Link href={"/product"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        className="w-5"
                    >
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold">New Category</h1>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-lg border flex items-center gap-2">
                <CategoryForm type={type as "new" | "edit"} />
            </div>
        </div>
    );
}
