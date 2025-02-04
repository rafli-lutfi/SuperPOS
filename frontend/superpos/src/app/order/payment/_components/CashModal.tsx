"use client";

import Modal from "@/components/Modal";
import { resetCart } from "@/libs/features/cart/cartSlice";
import { poster, updater } from "@/libs/fetcher";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { Response } from "@/types/Response";
import { Transaction } from "@/types/Transaction";
import { toIDRCurrency } from "@/utils/formatter";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

type CashModalProps = {
    isOpen: boolean;
    closeModal: () => void;
};

export default function CashModal({ isOpen, closeModal }: CashModalProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { dataCart, total } = useAppSelector((state) => state.cartSlice);

    const [paidAmount, setPaidAmount] = useState<number>(0);

    const handlePaidAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => setPaidAmount(Number(e.target.value));

    const handleOnSubmitButton = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (paidAmount < total) {
                return Swal.fire({
                    title: "Insufficient Amount",
                    icon: "warning",
                });
            }

            const payload = {
                details: dataCart.map((item) => {
                    return { product_id: item.product.id, quantity: item.quantity };
                }),
            };

            const transaction: Response<Transaction> = await poster("http://localhost:8080/api/transactions", payload);

            const transactionId = transaction.data.id;

            const payment: Response<{ change: number }> = await updater(
                `http://localhost:8080/api/transactions/${transactionId}/pay`,
                { total_pay: paidAmount }
            );

            Swal.fire({
                title: "transaction success",
                text: "Change: " + toIDRCurrency(payment.data.change),
                icon: "success",
                confirmButtonText: "Confirm",
                confirmButtonColor: "#00B0FF",
            });

            dispatch(resetCart());
            router.push("/order");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        isOpen && (
            <Modal>
                <h3 className="text-2xl font-bold text-gray-900">Cash</h3>
                <form onSubmit={handleOnSubmitButton} className="">
                    <div className="mt-2 px-7 py-3">
                        {/* paid amount */}
                        <div className="flex flex-col text-left gap-2">
                            <label htmlFor="paid" className="font-bold">
                                Paid Amount:
                            </label>
                            <input
                                type="number"
                                name="paid"
                                id="paid"
                                placeholder="Rp. 0"
                                className="border indent-2 h-12 w-full"
                                required
                                onChange={handlePaidAmountInput}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            className="px-4 py-2 bg-secondary text-white text-base font-medium rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={handleOnSubmitButton}
                        >
                            Confirm
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </Modal>
        )
    );
}
