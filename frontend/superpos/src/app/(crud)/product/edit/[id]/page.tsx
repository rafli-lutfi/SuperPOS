"use client";

import Link from "next/link";
import ProductForm from "../../_components/ProductForm";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { Response } from "@/types/Response";
import { Product } from "@/types/Product";
import { fetcher } from "@/libs/fetcher";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditProductPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [, , type, productId] = pathname.split("/");

    useEffect(() => {
        if (productId === undefined || Number.isNaN(Number(productId))) {
            router.push("/product");
        }
        if (type !== "edit") {
            router.push("/product");
        }
    }, [productId, type, router]);

    const {
        data: productResponse,
        isLoading: isProductLoading,
        error: productError,
    } = useSWR<Response<Product>>(`${API_URL}/products/${productId}`, fetcher);

    return isProductLoading ? (
        <Loading />
    ) : productError ? (
        <Error error={productError} />
    ) : (
        <div className="mx-6 w-full overflow-auto">
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
                <h1 className="text-2xl font-bold">Edit Product</h1>
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                <ProductForm product={productResponse?.data} type={type as "new" | "edit"} />
            </div>
        </div>
    );
}
