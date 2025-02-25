import Error from "@/components/Error";
import { fetcher } from "@/libs/fetcher";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import { capitalizeEachWord } from "@/utils/formatter";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type DetailProductPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: DetailProductPageProps): Promise<Metadata> {
    const productId = (await params).id;

    return {
        title: `Product Id ${productId}`,
    };
}

export default async function DetailProductPage({ params }: DetailProductPageProps) {
    try {
        const productId = Number((await params).id);

        if (Number.isNaN(productId)) {
            redirect("/product");
        }

        const res = await fetcher<Response<Product>>(`${API_URL}/products/${productId}`);

        const product = res.data;

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
                    <h1 className="text-2xl font-bold">Detail Product</h1>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                    <Image
                        src={product.image_url || "/default-product-image.png"}
                        alt={product.name || "default product image"}
                        width={200}
                        height={200}
                    />
                    <div className="flex w-full flex-col gap-2 text-sm">
                        <p>
                            <span className="font-bold">Product ID:</span> {product.id}
                        </p>
                        <p>
                            <span className="font-bold">Name:</span> {capitalizeEachWord(product.name)}
                        </p>
                        <p>
                            <span className="font-bold">Category:</span>{" "}
                            {capitalizeEachWord(product.category.name as string)}
                        </p>
                        <p>
                            <span className="font-bold">Price:</span> {product.price}
                        </p>
                        <p>
                            <span className="font-bold">Stock:</span> {product.stock} left
                        </p>
                        <p>
                            <span className="font-bold">Description:</span> {product.description || "none"}
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return <Error error={error as Response<null>} />;
    }
}
