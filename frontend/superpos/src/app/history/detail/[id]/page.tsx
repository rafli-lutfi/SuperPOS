"use client";

import useSWR from "swr";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Response } from "@/types/Response";
import { Transaction } from "@/types/Transaction";
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

    const [, , , transactionId] = pathname.split("/");

    useEffect(() => {
        if (transactionId === undefined) {
            router.push("/history");
        }
    }, [router, transactionId]);

    const {
        data: transactionResponse,
        isLoading: isTransactionLoading,
        error: transactionError,
    } = useSWR<Response<Transaction>>(`${API_URL}/transactions/${transactionId}`, fetcher);

    return isTransactionLoading ? (
        <Loading />
    ) : transactionError ? (
        <Error error={transactionError} />
    ) : (
        <div className="mx-6 w-full">
            <div className="flex gap-4 items-center">
                <Link href={"/history"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        className="w-5"
                    >
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold my-4">Transaction Detail</h1>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-lg border">
                <p className="font-bold ">Transaction ID: POS-{transactionResponse?.data.id.replaceAll("-", "")}</p>
                <p className="">{formatDate(transactionResponse?.data.created_at as string)}</p>
                <p className="mt-2 font-bold">Detail Items</p>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase">
                                Product Name
                            </th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-700 uppercase">Product Price</th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-700 uppercase">Quantity</th>
                            <th className="py-3 px-4 text-sm font-medium text-gray-700 uppercase">Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionResponse?.data?.details?.map((transactionItem) => (
                            <tr key={transactionItem.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4 flex items-center space-x-4">
                                    <Image
                                        src={transactionItem.image_url || "/default-product-image.png"}
                                        width={60}
                                        height={60}
                                        alt={transactionItem.product_name || "default product image"}
                                        className="rounded-lg"
                                    />
                                    <p className="text-sm text-gray-800">
                                        {capitalizeEachWord(transactionItem.product_name)}
                                    </p>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 text-center">
                                    {toIDRCurrency(transactionItem.product_price)}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 text-center">
                                    {transactionItem.quantity}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-700 text-center">
                                    {toIDRCurrency(transactionItem.sub_total)}
                                </td>
                            </tr>
                        ))}
                        <tr className="border-t border-gray-200 bg-gray-50">
                            <td colSpan={2} className="bg-gray-100"></td>
                            <td className="py-4 px-4 text-sm font-bold text-gray-700">Total Amount</td>
                            <td className="py-4 px-4 text-sm text-center font-bold text-gray-700">
                                {toIDRCurrency(transactionResponse?.data.total_amount as number)}
                            </td>
                        </tr>
                        <tr className="border-t border-gray-200 bg-gray-50">
                            <td colSpan={2} className="bg-gray-100"></td>
                            <td className="py-4 px-4 text-sm font-bold text-gray-700">Total Pay</td>
                            <td className="py-4 px-4 text-sm text-center font-bold text-gray-700">
                                {toIDRCurrency(transactionResponse?.data.total_pay as number)}
                            </td>
                        </tr>
                        <tr className="border-t border-gray-200 bg-gray-50">
                            <td colSpan={2} className="bg-gray-100"></td>
                            <td className="py-4 px-4 text-sm font-bold text-gray-700">Change</td>
                            <td className="py-4 px-4 text-sm text-center font-bold text-gray-700">
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
