"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { fetcher, poster, updater } from "@/libs/fetcher";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import { capitalizeEachWord, isValidUrl } from "@/utils/formatter";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";
import * as yup from "yup";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PRODUCT_SCHEMA: yup.ObjectSchema<FormValues> = yup.object({
    id: yup.number(),
    name: yup.string().required(),
    category_id: yup.number().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    description: yup.string().nullable(),
    image_url: yup.string().url("Must be a valid URL").nullable(),
});

type ProductFormProps = {
    product?: Product;
    type: "new" | "edit";
};

type FormValues = {
    id?: number;
    name: string;
    category_id: number;
    price: number;
    stock: number;
    description?: string | null;
    image_url?: string | null;
};

export default function ProductForm({ product, type }: ProductFormProps) {
    const router = useRouter();

    const {
        data: categoriesResponse,
        isLoading: isCategoriesLoading,
        error: categoriesError,
    } = useSWR<Response<Category[]>>(`${API_URL}/categories`, fetcher);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: product?.id || 0,
            category_id: product?.category.id,
            name: product?.name,
            stock: product?.stock,
            price: product?.price,
            description: product?.description,
            image_url: product?.image_url,
        },
        resolver: yupResolver(PRODUCT_SCHEMA),
    });

    const selectedCategory = watch("category");
    const imageUrl = isValidUrl(watch("image_url")) ? watch("image_url") : null;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (type === "edit") {
                await updater(`${API_URL}/products/${product?.id}`, data);
                await mutate(`${API_URL}/products/${product?.id}`);
            } else {
                await poster(`${API_URL}/products`, data);
            }

            Swal.fire({
                title: "Success!",
                text: `Product has been ${type === "new" ? "created" : "updated"}`,
                icon: "success",
            });

            router.push("/product");
        } catch (error) {
            const errorResponse = error as Response<null>;
            const errorMessage = errorResponse?.message || "An unknown error occurred.";

            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
            });
        }
    };

    return isCategoriesLoading ? (
        <Loading />
    ) : categoriesError ? (
        <Error error={categoriesError} />
    ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-6 p-4">
            {/* ID Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="id" className="text-sm font-medium text-gray-700">
                    ID:
                </label>
                <input
                    type="number"
                    id="id"
                    disabled
                    className="border border-gray-300 p-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    placeholder="Auto-Generated"
                    {...register("id")}
                />
            </div>

            {/* Name Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter product name"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm italic">⚠️ {errors.name.message}</p>}
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category:
                </label>
                <select
                    className="px-2 py-1 rounded-lg border shadow-lg"
                    {...register("category_id")}
                    value={selectedCategory}
                >
                    {categoriesResponse?.data.map((category) => (
                        <option key={category.id} value={category.id}>
                            {capitalizeEachWord(category.name)}
                        </option>
                    ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm italic">⚠️ {errors.category_id.message}</p>}
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description:
                </label>
                <textarea
                    id="description"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    rows={4}
                    placeholder="Describe the product"
                    {...register("description")}
                />
            </div>

            {/* Price and Stock Fields (Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="text-sm font-medium text-gray-700">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter price (cth. Rp 20.000)"
                        {...register("price")}
                    />
                    {errors.price && <p className="text-red-500 text-sm italic">⚠️ {errors.price.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="stock" className="text-sm font-medium text-gray-700">
                        Stock:
                    </label>
                    <input
                        type="number"
                        id="stock"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter stock quantity"
                        {...register("stock")}
                    />
                    {errors.stock && <p className="text-red-500 text-sm italic">⚠️ {errors.stock.message}</p>}
                </div>
            </div>

            {/* Image URL Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
                    Image URL <span className="text-xs italic font-bold">(Must be from Tokopedia)</span> :
                </label>
                <input
                    type="text"
                    id="imageUrl"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    {...register("image_url")}
                />
                {errors.image_url && <p className="text-red-500 text-sm italic">⚠️ {errors.image_url.message}</p>}
            </div>

            {/* Image Preview */}
            <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-gray-700">Preview Image</p>
                <div className="w-40 h-40 border border-gray-300 rounded-md overflow-hidden shadow-sm">
                    <Image
                        src={imageUrl || "/default-product-image.png"}
                        alt="Product Preview"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
                {product ? "Update Product" : "Save Product"}
            </button>
        </form>
    );
}
