"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { fetcher } from "@/libs/fetcher";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import { capitalizeEachWord } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DetailProductPage() {
    const pathname = usePathname();
    const router = useRouter();

    const [, , , productId] = pathname.split("/");

    useEffect(() => {
        if (productId === undefined || Number.isNaN(Number(productId))) {
            router.push("/product");
        }
    }, [productId, router]);

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
                <h1 className="text-2xl font-bold">Detail Product</h1>
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                <Image
                    src={productResponse?.data.image_url || "/default-product-image.png"}
                    alt={productResponse?.data.name || "default product image"}
                    width={200}
                    height={200}
                />
                <div className="flex w-full flex-col gap-2 text-sm">
                    <p>
                        <span className="font-bold">Product ID:</span> {productResponse?.data.id}
                    </p>
                    <p>
                        <span className="font-bold">Name:</span>{" "}
                        {capitalizeEachWord(productResponse?.data.name as string)}
                    </p>
                    <p>
                        <span className="font-bold">Category:</span>{" "}
                        {capitalizeEachWord(productResponse?.data.category.name as string)}
                    </p>
                    <p>
                        <span className="font-bold">Price:</span> {productResponse?.data.price}
                    </p>
                    <p>
                        <span className="font-bold">Stock:</span> {productResponse?.data.stock} left
                    </p>
                    <p>
                        <span className="font-bold">Description:</span> {productResponse?.data.description || "none"}
                    </p>
                </div>
            </div>
        </div>
    );
}
