"use client";

import ProductCard from "@/app/order/_components/ProductCard";
import { fetcher } from "@/libs/fetcher";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Category } from "@/types/Category";
import Loading from "@/components/Loading";
import CategoryButtons from "./_components/CategoryButton";
import SearchButton from "./_components/SearchButton";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, usePagination } from "@/libs/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import SortButton from "./_components/SortButton";
import RightLayout from "@/components/Right";
import Error from "@/components/Error";
import { addItem } from "@/libs/features/cart/cartSlice";
import Cart from "./_components/Cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrderPage() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

    // State management
    const [selectedCategory, setSelectedCategory] = useState(queryParams.get("category") || "");
    const [selectedSort, setSelectedSort] = useState(
        queryParams.get("sort") && queryParams.get("order")
            ? `${queryParams.get("sort")}_${queryParams.get("order")}`
            : "name_asc"
    );

    // Fetch products with pagination
    const {
        data: productsResponse,
        isLoading: isProductsLoading,
        error: productsError,
        setSize,
        size,
        isReachEnd,
    } = usePagination<Product, "products">(`${API_URL}/products`, queryParams.toString());

    // Fetch categories
    const {
        data: categoriesResponse,
        isLoading: isCategoriesLoading,
        error: categoriesError,
    } = useSWR<Response<Category[]>>(`${API_URL}/categories`, fetcher);

    const isLoading = isProductsLoading || isCategoriesLoading;

    // Reset filter if no query params
    useEffect(() => {
        if (!searchParams.toString()) {
            setSelectedCategory("");
            setSelectedSort("name_asc");
        }
    }, [searchParams]);

    // Handlers
    const handleCategoryButton = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSelectedSort("name_asc");
        return router.push(categoryName ? `/order?category=${categoryName}` : "/order");
    };

    const handleSearchButton = (search: string) => {
        setSelectedSort("name_asc");
        setSelectedCategory("");
        return router.push(search ? `/order?search=${search}` : "/order");
    };

    const handleSortButton = (sort: string) => {
        setSelectedSort(sort);
        const [name, order] = sort.split("_");

        queryParams.set("sort", name);
        queryParams.set("order", order);

        return router.push(`/order?${queryParams}`);
    };

    const handleProductClick = useCallback((product: Product) => dispatch(addItem(product)), [dispatch]);

    const handleLoadMoreData = () => setSize(size + 1);

    // Render loading or error states
    if (isLoading) return <Loading />;
    if (productsError || categoriesError) return <Error error={productsError || categoriesError} />;

    return (
        <>
            <div className="mx-6 h-full w-2/3 overflow-y-auto" id="scrollable">
                <InfiniteScroll
                    next={handleLoadMoreData}
                    hasMore={!isReachEnd}
                    loader={
                        <div className="col-span-2 mt-2 flex justify-center md:col-span-3">
                            <Loading />
                        </div>
                    }
                    dataLength={productsResponse?.length ?? 0}
                    scrollableTarget="scrollable"
                >
                    {/* Title */}
                    <div className="my-4 flex flex-wrap items-center justify-between gap-2">
                        <h1 className="text-2xl font-bold">Order</h1>
                        <SearchButton handleSearchButton={handleSearchButton} />
                    </div>

                    {/* Sort and filter */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <CategoryButtons
                            categories={categoriesResponse?.data}
                            selectedCategory={selectedCategory}
                            handleCategoryButton={handleCategoryButton}
                        />
                        <SortButton selectedSort={selectedSort} handleSortButton={handleSortButton} />
                    </div>

                    {/* Catalog */}
                    <div className="my-4 grid grid-cols-1 gap-2 tablet:grid-cols-2 laptop:grid-cols-3">
                        {productsResponse?.map((productsGroup) =>
                            productsGroup.data.products.map((product) => (
                                <ProductCard key={product.id} product={product} onClickProduct={handleProductClick} />
                            ))
                        )}
                    </div>
                </InfiniteScroll>
            </div>
            <RightLayout>
                <Cart />
            </RightLayout>
        </>
    );
}
