import Link from "next/link";
import { redirect } from "next/navigation";
import CategoryForm from "../../_components/CategoryForm";
import { Metadata } from "next";
import { fetcher } from "@/libs/fetcher";
import { Response } from "@/types/Response";
import { Category } from "@/types/Category";
import Error from "@/components/Error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EditCateogryPageProps = {
    params: { id?: string };
};

export const metadata: Metadata = {
    title: "Edit Category",
};

export default async function EditCateogryPage({ params }: EditCateogryPageProps) {
    try {
        const categoryId = params.id ? Number(params.id) : NaN;

        if (Number.isNaN(Number(categoryId))) {
            redirect("/category");
        }

        const res = await fetcher<Response<Category>>(`${API_URL}/categories/${categoryId}`);

        const category = res.data;

        return (
            <div className="mx-6 w-full overflow-auto">
                <div className="my-4 flex items-center gap-4">
                    <Link href={"/category"}>
                        <LeftArrowIcon />
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Category</h1>
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                    <CategoryForm type="edit" category={category} />
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
