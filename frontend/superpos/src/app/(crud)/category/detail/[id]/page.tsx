import Error from "@/components/Error";
import { fetcher } from "@/libs/fetcher";
import { Category } from "@/types/Category";
import { Response } from "@/types/Response";
import { capitalizeEachWord } from "@/utils/formatter";
import Link from "next/link";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type DetailCategoryPageProps = {
    params: { id: string };
};

export function generateMetadata({ params }: DetailCategoryPageProps) {
    const categoryId = params.id;

    return {
        title: `Category ID ${categoryId}`,
        description: "The POS that's Actually Super!",
        icons: {
            icon: "/favicon.png",
        },
    };
}

export default async function DetailCategoryPage({ params }: DetailCategoryPageProps) {
    try {
        const categoryId = params.id ? Number(params.id) : NaN;

        if (Number.isNaN(Number(categoryId))) {
            redirect("/category");
        }

        const res = await fetcher<Response<Category>>(`${API_URL}/categories/${categoryId}`);

        const category = res.data;

        return (
            <div className="mx-6 w-full">
                <div className="my-4 flex items-center gap-4">
                    <Link href={"/category"}>
                        <LeftArrowIcon />
                    </Link>
                    <h1 className="text-2xl font-bold">Detail Category</h1>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border bg-white px-4 py-2 shadow-lg">
                    <p>
                        <span className="font-bold">Category ID:</span> {category.id}
                    </p>
                    <p>
                        <span className="font-bold">Name:</span> {capitalizeEachWord(category.name as string)}
                    </p>
                    <p>
                        <span className="font-bold">Total Related Product:</span> {category.total_related_product}
                    </p>
                    <p>
                        <span className="font-bold">Description:</span> {category.description || "none"}
                    </p>
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
