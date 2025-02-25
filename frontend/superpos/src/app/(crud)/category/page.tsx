import Link from "next/link";
import CategoryTable from "./_components/CategoryTable";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
    title: "Category",
};

export default function CategoryPage() {
    return (
        <div className="mx-6 flex h-full w-full flex-col">
            <h1 className="my-4 text-2xl font-bold">Category</h1>
            <Link href="/category/new">
                <button
                    type="button"
                    className="mb-4 rounded bg-interactive px-2 py-1 text-white hover:text-black hover:brightness-90"
                >
                    + Create New Category
                </button>
            </Link>
            <div className="mb-4 h-full overflow-auto rounded-lg bg-white shadow-lg" id="table-container">
                <Suspense fallback={<Loading />}>
                    <CategoryTable />
                </Suspense>
            </div>
        </div>
    );
}
