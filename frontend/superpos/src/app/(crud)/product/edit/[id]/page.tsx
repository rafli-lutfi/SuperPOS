import Link from "next/link";
import ProductForm from "../../_components/ProductForm";
import { Response } from "@/types/Response";
import { fetcher } from "@/libs/fetcher";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Metadata } from "next";
import { Product } from "@/types/Product";
import { redirect } from "next/navigation";
import { Category } from "@/types/Category";
import { Suspense } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EditProductPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
    const productId = (await params).id;

    return {
        title: `Edit Product ID ${productId}`,
    };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    try {
        const productId = Number((await params).id);

        if (Number.isNaN(productId)) {
            redirect("/product");
        }

        const productRes = await fetcher<Response<Product>>(`${API_URL}/products/${productId}`);
        const categoriesRes = await fetcher<Response<Category[]>>(`${API_URL}/categories`);

        const product = productRes.data;
        const categories = categoriesRes.data;

        return (
            <div className="mx-6 w-full overflow-auto">
                <div className="my-4 flex items-center gap-4">
                    <Link href={"/product"}>
                        <LeftArrowIcon />
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                    <Suspense fallback={<Loading />}>
                        <ProductForm product={product} categories={categories} type="edit" />
                    </Suspense>
                </div>
            </div>
        );
    } catch (error) {
        return <Error error={error as Response<null>} />;
    }
}

const LeftArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-5">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
);
