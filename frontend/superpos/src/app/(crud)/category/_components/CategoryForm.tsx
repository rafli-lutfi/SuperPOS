"use client";

import { poster, updater } from "@/libs/fetcher";
import { Category } from "@/types/Category";
import { Response } from "@/types/Response";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import Swal from "sweetalert2";
import * as yup from "yup";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CATEGORY_SCHEMA: yup.ObjectSchema<FormValues> = yup.object({
    id: yup.number(),
    name: yup.string().required(),
    description: yup.string().nullable(),
});

type CategoryFormProps = {
    category?: Category;
    type: "new" | "edit";
};

type FormValues = {
    id?: number;
    name: string;
    description?: string | null;
};

export default function CategoryForm({ category, type }: CategoryFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: category?.id || 0,
            name: category?.name,
            description: category?.description,
        },
        resolver: yupResolver(CATEGORY_SCHEMA),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (type === "edit") {
                await updater(`${API_URL}/categories/${category?.id}`, data);
                await mutate(`${API_URL}/categories/${category?.id}`);
            } else {
                await poster(`${API_URL}/categories`, data);
            }

            Swal.fire({
                title: "Success!",
                text: `Category has been ${type === "new" ? "created" : "updated"}`,
                icon: "success",
            });

            router.push("/category");
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

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
                {category ? "Update Category" : "Save Category"}
            </button>
        </form>
    );
}
