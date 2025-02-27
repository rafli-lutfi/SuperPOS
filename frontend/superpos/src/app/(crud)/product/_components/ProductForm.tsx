"use client";

import { poster, updater } from "@/libs/fetcher";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import { capitalizeEachWord, isValidUrl } from "@/utils/formatter";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { mutate } from "swr";
import * as yup from "yup";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PRODUCT_SCHEMA: yup.ObjectSchema<FormValues> = yup.object({
    id: yup
        .number()
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .optional(),
    name: yup.string().required(),
    category_id: yup.number().positive("please select category").integer().required(),
    price: yup.number().typeError("price must be a number").positive("Price must be a positive number").required(),
    stock: yup.number().typeError("Stock must be a number").positive().integer().required(),
    description: yup.string().nullable(),
    image_url: yup.string().url("Must be a valid URL").nullable(),
});

type ProductFormProps = {
    categories: Category[];
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

export default function ProductForm({ product, categories, type }: ProductFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            category_id: 0,
        },
        resolver: yupResolver(PRODUCT_SCHEMA),
    });

    useEffect(() => {
        if (type === "edit" && product && categories) {
            reset({
                id: product.id,
                name: product.name,
                category_id: product.category.id,
                price: product.price,
                stock: product.stock,
                description: product.description,
                image_url: product.image_url,
            });
        }
    }, [categories, product, reset, type]);

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6 p-4">
            {/* ID Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="id" className="text-sm font-medium text-gray-700">
                    ID:
                </label>
                <input
                    type="number"
                    id="id"
                    disabled
                    className="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-600"
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
                    className="rounded-md border border-gray-300 p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                    {...register("name")}
                />
                {errors.name && <p className="text-sm italic text-red-500">⚠️ {errors.name.message}</p>}
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category:
                </label>
                <select
                    className="rounded-lg border px-2 py-1 shadow-lg"
                    {...register("category_id")}
                    value={selectedCategory}
                >
                    <option value={0} disabled>
                        Select Category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {capitalizeEachWord(category.name)}
                        </option>
                    ))}
                </select>
                {errors.category_id && <p className="text-sm italic text-red-500">⚠️ {errors.category_id.message}</p>}
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description:
                </label>
                <textarea
                    id="description"
                    className="rounded-md border border-gray-300 p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe the product"
                    {...register("description")}
                />
            </div>

            {/* Price and Stock Fields (Side by Side) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="text-sm font-medium text-gray-700">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="rounded-md border border-gray-300 p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter price (cth. Rp 20.000)"
                        min={0}
                        {...register("price")}
                    />
                    {errors.price && <p className="text-sm italic text-red-500">⚠️ {errors.price.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="stock" className="text-sm font-medium text-gray-700">
                        Stock:
                    </label>
                    <input
                        type="number"
                        id="stock"
                        className="rounded-md border border-gray-300 p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter stock quantity"
                        min={0}
                        {...register("stock")}
                    />
                    {errors.stock && <p className="text-sm italic text-red-500">⚠️ {errors.stock.message}</p>}
                </div>
            </div>

            {/* Image URL Field */}
            <div className="flex flex-col gap-1">
                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
                    Image URL <span className="text-xs font-bold italic">(Must be from Tokopedia)</span> :
                </label>
                <input
                    type="text"
                    id="imageUrl"
                    className="rounded-md border border-gray-300 p-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    {...register("image_url")}
                />
                {errors.image_url && <p className="text-sm italic text-red-500">⚠️ {errors.image_url.message}</p>}
            </div>

            {/* Image Preview */}
            <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-gray-700">Preview Image</p>
                <div className="h-40 w-40 overflow-hidden rounded-md border border-gray-300 shadow-sm">
                    <Image
                        src={imageUrl || "/default-product-image.png"}
                        alt="Product Preview"
                        width={160}
                        height={160}
                        className="h-full w-full object-cover p-2"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {product ? "Update Product" : "Save Product"}
            </button>
        </form>
    );
}
