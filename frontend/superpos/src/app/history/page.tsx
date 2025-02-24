"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SortableHeader from "@/components/SortableHeader";
import Spinner from "@/components/Spinner";
import { usePagination } from "@/libs/hooks";
import { Transaction } from "@/types/Transaction";
import { formatDate, toIDRCurrency } from "@/utils/formatter";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HistoryTransactionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

    // State management
    const [sortColumn, setSortColumn] = useState<string | null>(queryParams.get("sort"));
    const [sortOrder, setSortOrder] = useState<string>(queryParams.get("order") || "desc");

    // Fetch transaction with pagination
    const {
        data: transactionResponse,
        isLoading: isTransactionLoading,
        error: transactionError,
        isReachEnd,
        setSize,
        size,
    } = usePagination<Transaction, "transactions">(`${API_URL}/transactions`, queryParams.toString());

    // Reset sort column and order if no query params
    useEffect(() => {
        if (searchParams.size === 0) {
            setSortColumn("createdAt");
            setSortOrder("desc");
        }
    }, [searchParams]);

    // Handler for sorting
    const handleSortButton = (column: string) => {
        const order = sortOrder === "desc" ? "asc" : "desc";

        setSortColumn(column);
        setSortOrder(order);

        router.push(`/history?sort=${column}&order=${order}`);
    };

    // Render loading or error states
    if (isTransactionLoading) return <Loading />;
    if (transactionError) return <Error error={transactionError} />;

    return (
        <div className="mx-6 flex h-full w-full flex-col">
            <h1 className="my-4 text-2xl font-bold">Transaction History</h1>
            <div className="h-full overflow-auto rounded-lg shadow-lg" id="table-container">
                <InfiniteScroll
                    next={() => setSize(size + 1)}
                    hasMore={!isReachEnd}
                    loader={<Spinner />}
                    dataLength={transactionResponse?.length ?? 0}
                    scrollableTarget="table-container"
                    hasChildren
                >
                    <table className="w-full border-collapse bg-white">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-100">
                                <th className="border-b border-gray-300 px-4 py-2 text-center">No</th>
                                <th className="border-b border-gray-300 px-4 py-2 text-center">
                                    <div className="flex items-center justify-center">
                                        <p>ID</p>
                                    </div>
                                </th>

                                <SortableHeader
                                    label="Transaction Date"
                                    column="createdAt"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onClick={handleSortButton}
                                    align="center"
                                />
                                <SortableHeader
                                    label="Total Price"
                                    column="totalAmount"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onClick={handleSortButton}
                                    align="end"
                                />
                                <SortableHeader
                                    label="Total Paid"
                                    column="totalPay"
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                                    onClick={handleSortButton}
                                    align="end"
                                />
                                <th className="border-b border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionResponse?.map((transactionGroup, groupIndex) => {
                                const prevTransactionsCount = transactionResponse
                                    .slice(0, groupIndex) // Ambil semua batch sebelumnya
                                    .reduce((acc, curr) => acc + curr.data.transactions.length, 0);

                                return transactionGroup.data.transactions.map((transaction, index) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="border-gray-300 px-4 py-2 text-center">
                                            {prevTransactionsCount + index + 1}
                                        </td>
                                        <td className="border-gray-300 px-4 py-2 text-center">
                                            {transaction.id.replaceAll("-", "")}
                                        </td>
                                        <td className="border-gray-300 px-4 py-2 text-center">
                                            {formatDate(transaction.created_at)}
                                        </td>
                                        <td className="border-gray-300 px-4 py-2 text-right">
                                            {toIDRCurrency(transaction.total_amount)}
                                        </td>
                                        <td className="border-gray-300 px-4 py-2 text-right">
                                            {toIDRCurrency(transaction.total_pay as number)}
                                        </td>
                                        <td className="border-gray-300 px-4 py-2 text-center">
                                            <button className="rounded bg-blue-500 px-2 py-1 text-white hover:brightness-90">
                                                <Link href={`/history/detail/${transaction.id}`}>
                                                    <ViewIcon />
                                                </Link>
                                            </button>
                                        </td>
                                    </tr>
                                ));
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
}

const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-4">
        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
    </svg>
);
