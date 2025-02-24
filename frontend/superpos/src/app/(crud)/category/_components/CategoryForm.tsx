"use client";

import { poster, updater } from "@/libs/fetcher";
import { Response } from "@/types/Response";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";
import { notify } from "@/utils/notification";
import { Category } from "@/types/Category";
import { mutate } from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CATEGORY_SCHEMA: yup.ObjectSchema<FormValues> = yup.object({
    id: yup.number().optional(),
    name: yup.string().required(),
    description: yup.string().nullable(),
});

type CategoryFormProps = {
    type: "new" | "edit";
    category?: Category;
};

type FormValues = {
    id?: number;
    name: string;
    description?: string | null;
};

export default function CategoryForm({ type, category }: CategoryFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CATEGORY_SCHEMA),
    });

    useEffect(() => {
        if (type === "edit" && category) {
            reset({
                id: category.id,
                name: category.name,
                description: category.description,
            });
        }
    }, [category, type, reset]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (type === "edit") {
                await updater(`${API_URL}/categories/${category?.id}`, data);
                mutate(`${API_URL}/categories/${category?.id}`);
            } else {
                await poster(`${API_URL}/categories`, data);
            }

            notify.success(undefined, `Category has been ${type === "new" ? "created" : "updated"}`);

            router.push("/category");
        } catch (error) {
            const errorResponse = error as Response<null>;
            const errorMessage = errorResponse?.message || "An unknown error occurred.";

            notify.error(undefined, errorMessage);
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

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {type === "edit" ? "Update Category" : "Save Category"}
            </button>
        </form>
    );
}
