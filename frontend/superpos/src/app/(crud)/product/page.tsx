import Link from "next/link";
import ProductTable from "./_components/ProductTable";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
    title: "Product",
};

export default function ProductPage() {
    return (
        <div className="mx-6 flex h-full w-full flex-col">
            <h1 className="my-4 text-2xl font-bold">Product</h1>

            {/* Create New Product Button */}
            <Link href="/product/new">
                <button className="mb-4 rounded bg-interactive px-2 py-1 text-white hover:text-black hover:brightness-90">
                    + Create New Product
                </button>
            </Link>

            {/* Product Table */}
            <div className="mb-4 h-full overflow-auto rounded-lg shadow-lg" id="table-container">
                <Suspense fallback={<Loading />}>
                    <ProductTable />
                </Suspense>
            </div>
        </div>
    );
}
