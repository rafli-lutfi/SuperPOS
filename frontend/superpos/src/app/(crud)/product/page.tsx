"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/SortableHeader";
import Spinner from "@/components/Spinner";
import { deleter } from "@/libs/fetcher";
import { usePagination } from "@/libs/hooks";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import { toIDRCurrency, truncateName } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryParams = new URLSearchParams(searchParams.toString());

    const [sortColumn, setSortColumn] = useState<string | null>(queryParams.get("sort"));
    const [sortOrder, setSortOrder] = useState<string>(queryParams.get("order") || "asc");

    const {
        data: productsResponse,
        isLoading: isProductLoading,
        error: productError,
        isReachEnd,
        setSize,
        size,
        mutate,
    } = usePagination<Product, "products">(`${API_URL}/products`, queryParams.toString());

    // Reset sort column and order if no query params
    useEffect(() => {
        if (searchParams.size === 0) {
            setSortColumn("name");
            setSortOrder("asc");
        }
    }, [searchParams]);

    // Handle sorting
    const handleSortButton = (column: string) => {
        const order = sortOrder === "desc" ? "asc" : "desc";

        setSortColumn(column);
        setSortOrder(order);

        router.push(`/product?sort=${column}&order=${order}`);
    };

    // Handle delete product
    const handleDeleteButton = async (productId: number, productName: string) => {
        Swal.fire({
            title: "Are You Sure?",
            text: "Delete " + productName,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleter(`${API_URL}/products/${productId}`);
                    await mutate();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been deleted.",
                        icon: "success",
                    });
                } catch (error) {
                    const errorResponse = error as Response<null>;
                    const errorMessage = errorResponse?.message || "An unknown error occurred.";

                    Swal.fire({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                    });
                }
            }
        });
    };

    // Render loading and error states
    if (isProductLoading) return <Loading />;
    if (productError) return <Error error={productError} />;

    return (
        <div className="mx-6 flex h-full w-full flex-col">
            <h1 className="my-4 text-2xl font-bold">Product</h1>

            {/* Create New Product Button */}
            <Link href="/product/new">
                <button className="mb-4 rounded bg-interactive px-2 py-1 text-white hover:text-black hover:brightness-90">
                    + Create New Product
                </button>
            </Link>

            {/* Product Table */}
            <div className="mb-4 h-full overflow-auto rounded-lg shadow-lg" id="table-container">
                <InfiniteScroll
                    next={() => setSize(size + 1)}
                    hasMore={!isReachEnd}
                    loader={
                        <div className="flex w-full items-center justify-center">
                            <Spinner />
                        </div>
                    }
                    dataLength={productsResponse?.length ?? 0}
                    scrollableTarget="table-container"
                    hasChildren
                >
                    <table className="w-full table-fixed border-collapse bg-white">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-100">
                                <th className="w-16 border-b border-gray-300 px-4 py-2 text-center">
                                    <p>No</p>
                                </th>
                                <SortableHeader
                                    label="Product Name"
                                    column="name"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onClick={handleSortButton}
                                    align="center"
                                    className="w-48"
                                />
                                <SortableHeader
                                    label="Category"
                                    column="category"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onClick={handleSortButton}
                                    align="center"
                                    className="w-32"
                                />
                                <SortableHeader
                                    label="Price"
                                    column="price"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onClick={handleSortButton}
                                    align="center"
                                    className="w-28"
                                />
                                <th className="w-24 border-b border-gray-300 px-4 py-2 text-center">
                                    <p>Actions</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsResponse?.map((productsGroup, groupIndex) => {
                                const prevProductsCount = productsResponse
                                    .slice(0, groupIndex) // Ambil semua batch sebelumnya
                                    .reduce((acc, curr) => acc + curr.data.products.length, 0);

                                return productsGroup.data.products.map((product, index) => (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        index={prevProductsCount + index + 1}
                                        onDelete={handleDeleteButton}
                                    />
                                ));
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
}

type ProductRowProps = {
    product: Product;
    index: number;
    onDelete: (productId: number, productName: string) => void;
};

function ProductRow({ product, index, onDelete }: ProductRowProps) {
    return (
        <tr key={product.id} className="hover:bg-gray-50 tablet:text-sm laptop:text-base">
            <td className="border-gray-300 px-4 py-2 text-center">{index}</td>

            <td className="flex items-center gap-2">
                <Image
                    src={product.image_url || "/default-product-image.png"}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="p-2"
                />
                <p className="w-full" title={product.name}>
                    {truncateName(product.name, 50)}
                </p>
            </td>

            <td className="cursor-default border-gray-300 px-4 py-2 text-center" title={product.category.name}>
                {truncateName(product.category.name, 20)}
            </td>

            <td className="border-gray-300 px-4 py-2 text-center">{toIDRCurrency(product.price)}</td>

            <td className="border-gray-300 px-4 py-2 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {/* VIEW DETAIL PRODUCT */}
                    <Link href={`/product/detail/${product.id}`}>
                        <button className="rounded bg-blue-500 px-2 py-1 text-white hover:brightness-90">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="currentColor"
                                className="w-4"
                            >
                                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                            </svg>
                        </button>
                    </Link>

                    {/* EDIT BUTTON */}
                    <Link href={`/product/edit/${product.id}`}>
                        <button className="rounded bg-highlight px-2 py-1 text-white hover:brightness-90">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                fill="currentColor"
                                className="w-4"
                            >
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg>
                        </button>
                    </Link>

                    {/* DELETE BUTTON */}
                    <button
                        className="rounded bg-error px-2 py-1 text-white hover:brightness-90"
                        onClick={() => onDelete(product.id, product.name)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            className="w-4"
                        >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
}
