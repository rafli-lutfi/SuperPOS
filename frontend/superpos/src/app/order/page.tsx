"use client";

import ProductCard from "@/app/order/_components/ProductCard";
import { fetcher } from "@/libs/fetcher";
import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Category } from "@/types/Category";
import Loading from "@/components/Loading";
import CategoryButtons from "./_components/CategoryButton";
import SearchButton from "./_components/SearchButton";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, usePagination } from "@/libs/hooks";
import { Pagination } from "@/types/Pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import SortButton from "./_components/SortButton";
import RightLayout from "@/components/Right";
import Error from "@/components/Error";
import { addItem } from "@/libs/features/cart/cartSlice";
import Cart from "./_components/Cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrderPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryParams = new URLSearchParams(searchParams.toString());

    const [isLoading, setIsLoading] = useState<boolean>();
    const [selectedCategory, setSelectedCategory] = useState<string>(queryParams.get("category") || "");
    const [selectedSort, setSelectedSort] = useState(
        `${queryParams.get("sort")}_${queryParams.get("order")}` || "name_asc",
    );

    const {
        data: productsResponse,
        isLoading: isProductsLoading,
        error: productsError,
        setSize,
        size,
        isReachEnd,
    } = usePagination<Product, "products">(`${API_URL}/products`, queryParams.toString());

    const {
        data: categoriesResponse,
        isLoading: isCategoriesLoading,
        error: categoriesError,
    } = useSWR<Response<Category[]>>(`${API_URL}/categories`, fetcher);

    useEffect(() => {
        setIsLoading(isProductsLoading || isCategoriesLoading);
    }, [isProductsLoading, isCategoriesLoading]);

    useEffect(() => {
        const params = searchParams.toString();
        if (params == "") {
            setSelectedCategory("");
            setSelectedSort("name_asc");
        }
    }, [searchParams]);

    const handleCategoryButton = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSelectedSort("name_asc");
        if (categoryName) {
            return router.push(`/order?category=${categoryName}`);
        }
        return router.push("/order");
    };

    const handleSearchButton = (search: string) => {
        setSelectedSort("name_asc");
        setSelectedCategory("");
        if (search) {
            return router.push(`/order?search=${search}`);
        }
        return router.push("/order");
    };

    const handleSortButton = (sort: string) => {
        setSelectedSort(sort);
        const [name, order] = sort.split("_");

        queryParams.set("sort", name);
        queryParams.set("order", order);

        return router.push(`/order?${queryParams}`);
    };

    const handleLoadMoreData = () => setSize(size + 1);

    return (
        <>
            <div className="mx-6 h-full w-2/3 overflow-auto" id="scrollable">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Order</h1>
                    <SearchButton handleSearchButton={handleSearchButton} />
                </div>

                <div className="flex items-center justify-between">
                    <CategoryButtons
                        categories={categoriesResponse?.data}
                        selectedCategory={selectedCategory}
                        handleCategoryButton={handleCategoryButton}
                    />
                    <SortButton selectedSort={selectedSort} handleSortButton={handleSortButton} />
                </div>

                {isLoading ? (
                    <Loading />
                ) : productsError || categoriesError ? (
                    <Error error={productsError} />
                ) : (
                    <Catalog
                        productsResponse={productsResponse}
                        handleLoadMoreData={handleLoadMoreData}
                        isReachEnd={!isReachEnd}
                    />
                )}
            </div>
            <RightLayout>
                <Cart />
            </RightLayout>
        </>
    );
}

function Catalog({
    productsResponse,
    isReachEnd,
    handleLoadMoreData,
}: {
    productsResponse: Response<Pagination<Product, "products">>[] | undefined;
    isReachEnd: boolean;
    handleLoadMoreData: () => void;
}) {
    const dispatch = useAppDispatch();
    const handleProductClick = (product: Product) => {
        dispatch(addItem(product));
    };

    return (
        <InfiniteScroll
            next={handleLoadMoreData}
            hasMore={isReachEnd}
            loader={
                <div className="col-span-2 mt-2 flex justify-center md:col-span-3">
                    <Loading />
                </div>
            }
            dataLength={productsResponse?.length ?? 0}
            scrollableTarget="scrollable"
            className="my-4 grid grid-cols-2 gap-2 md:grid-cols-3"
        >
            {productsResponse?.map((productsGroup) =>
                productsGroup.data.products.map((product) => (
                    <ProductCard key={product.id} product={product} onClickProduct={handleProductClick} />
                )),
            )}
        </InfiniteScroll>
    );
}
