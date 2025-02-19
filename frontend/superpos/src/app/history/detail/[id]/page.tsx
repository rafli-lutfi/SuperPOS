"use client";

import useSWR from "swr";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Response } from "@/types/Response";
import { Transaction, TransactionItem } from "@/types/Transaction";
import { fetcher } from "@/libs/fetcher";
import { capitalizeEachWord, formatDate, toIDRCurrency } from "@/utils/formatter";
import Image from "next/image";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TransactionDetailPage() {
    const router = useRouter();
    const pathname = usePathname();

    // Extract transactionId from the URL
    const [, , , transactionId] = pathname.split("/");

    // Redirect to history page if transactionId is undefined
    useEffect(() => {
        if (transactionId === undefined) {
            router.push("/history");
        }
    }, [router, transactionId]);

    // Fetch transaction details
    const {
        data: transactionResponse,
        isLoading: isTransactionLoading,
        error: transactionError,
    } = useSWR<Response<Transaction>>(`${API_URL}/transactions/${transactionId}`, fetcher);

    // Render loading or error states
    if (isTransactionLoading) return <Loading />;
    if (transactionError) return <Error error={transactionError} />;

    return (
        <div className="mx-6 w-full">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
                <Link href={"/history"}>
                    <BackIcon />
                </Link>
                <h1 className="my-4 text-2xl font-bold">Transaction Detail</h1>
            </div>

            {/* Transaction Details */}
            <div className="rounded-lg border bg-white px-4 py-2 shadow-lg">
                <p className="font-bold">Transaction ID: POS-{transactionResponse?.data.id.replaceAll("-", "")}</p>
                <p className="">{formatDate(transactionResponse?.data.created_at as string)}</p>

                {/* Detail items table */}
                <p className="mt-2 font-bold">Detail Items</p>
                <table className="min-w-full border border-gray-300 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium uppercase text-gray-700">
                                Product Name
                            </th>
                            <th className="px-4 py-3 text-sm font-medium uppercase text-gray-700">Product Price</th>
                            <th className="px-4 py-3 text-sm font-medium uppercase text-gray-700">Quantity</th>
                            <th className="px-4 py-3 text-sm font-medium uppercase text-gray-700">Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionResponse?.data?.details?.map((transactionItem) => (
                            <TransactionItemRow transactionItem={transactionItem} key={transactionItem.id} />
                        ))}

                        {/* Total Amount */}
                        <tr className="border-t border-gray-200 bg-gray-50">
                            <td colSpan={2} className="bg-gray-100"></td>
                            <td className="px-4 py-4 text-sm font-bold text-gray-700">Total Amount</td>
                            <td className="px-4 py-4 text-center text-sm font-bold text-gray-700">
                                {toIDRCurrency(transactionResponse?.data.total_amount as number)}
                            </td>
                        </tr>

                        {/* Total Pay */}
                        <tr className="border-t border-gray-200 bg-gray-50">
                            <td colSpan={2} className="bg-gray-100"></td>
                            <td className="px-4 py-4 text-sm font-bold text-gray-700">Total Pay</td>
                            <td className="px-4 py-4 text-center text-sm font-bold text-gray-700">
                                {toIDRCurrency(transactionResponse?.data.total_pay as number)}
                            </td>
                        </tr>

                        {/* Change */}
                        <tr className="border-t border-gray-200 bg-gray-50">
                            <td colSpan={2} className="bg-gray-100"></td>
                            <td className="px-4 py-4 text-sm font-bold text-gray-700">Change</td>
                            <td className="px-4 py-4 text-center text-sm font-bold text-gray-700">
                                {toIDRCurrency(
                                    (transactionResponse?.data?.total_pay || 0) -
                                        (transactionResponse?.data?.total_amount || 0)
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

type TransactionItemRowProps = {
    transactionItem: TransactionItem;
};

function TransactionItemRow({ transactionItem }: TransactionItemRowProps) {
    return (
        <tr key={transactionItem.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="flex items-center space-x-4 px-4 py-4">
                <Image
                    src={transactionItem.image_url || "/default-product-image.png"}
                    width={60}
                    height={60}
                    alt={transactionItem.product_name || "default product image"}
                    className="rounded-lg"
                />
                <p className="text-sm text-gray-800">{capitalizeEachWord(transactionItem.product_name)}</p>
            </td>
            <td className="px-4 py-4 text-center text-sm text-gray-700">
                {toIDRCurrency(transactionItem.product_price)}
            </td>
            <td className="px-4 py-4 text-center text-sm text-gray-700">{transactionItem.quantity}</td>
            <td className="px-4 py-4 text-center text-sm text-gray-700">{toIDRCurrency(transactionItem.sub_total)}</td>
        </tr>
    );
}

// Reusable SVG Icons
const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" className="w-5">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </svg>
);
