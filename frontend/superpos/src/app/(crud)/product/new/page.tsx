import Link from "next/link";
import ProductForm from "../_components/ProductForm";
import Error from "@/components/Error";
import { Response } from "@/types/Response";
import { fetcher } from "@/libs/fetcher";
import { Category } from "@/types/Category";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
    title: "New Product",
};

export default async function CreateProductPage() {
    try {
        const categoriesRes = await fetcher<Response<Category[]>>(`${API_URL}/categories`);
        const categories = categoriesRes.data;
        return (
            <div className="mx-6 w-full">
                <div className="my-4 flex items-center gap-4">
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
                    <h1 className="text-2xl font-bold">New Product</h1>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                    <ProductForm type="new" categories={categories} />
                </div>
            </div>
        );
    } catch (error) {
        return <Error error={error as Response<null>} />;
    }
}
