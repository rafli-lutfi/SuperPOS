"use client";

import RightLayout from "@/components/Right";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/libs/hooks";
import Image from "next/image";
import { capitalizeEachWord, toIDRCurrency } from "@/utils/formatter";
import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";
import PaymentModal from "./_components/CashModal";

const itemListVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 1, // Memengaruhi percepatan animasi
        },
    },
};

export default function PaymentPage() {
    const router = useRouter();
    const { dataCart, total } = useAppSelector((state) => state.cartSlice);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

    useEffect(() => {
        if (dataCart.length === 0) {
            router.push("/order");
        }
    }, [dataCart.length, router]);

    const handleSelectedPaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleOnSubmitButton = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPaymentMethod === "cash") {
            setIsModalOpen(!isModalOpen); // open
        }
    };

    const handleOpenCloseModal = () => setIsModalOpen(!isModalOpen);

    return (
        <main className="h-screen w-full flex justify-between">
            <PaymentModal isOpen={isModalOpen} closeModal={handleOpenCloseModal} />

            <div className="mx-6 h-full w-2/3 overflow-auto" id="scrollable">
                <div className="my-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Order Details</h1>
                </div>

                <motion.div
                    className="mx-2 mb-4 h-full flex flex-col gap-4 overflow-y-auto"
                    initial="hidden"
                    animate="visible"
                    variants={itemListVariants}
                >
                    {dataCart.map((item, index) => (
                        <motion.div
                            key={item.product.id}
                            className="px-4 py-2 flex gap-4 bg-white items-center rounded-lg border border-slate-200 shadow-lg"
                            variants={itemVariants}
                        >
                            <span className="text-sm">{index + 1}</span>
                            <Image
                                src={item.product.image_url || "/default-product-image.png"}
                                width={75}
                                height={75}
                                alt={item.product.name}
                                className="rounded-lg"
                            />
                            <div className="w-full">
                                <p className="text-sm">{capitalizeEachWord(item.product.name)}</p>

                                <p className="mt-2 text-xs flex justify-between">
                                    <span>{toIDRCurrency(item.product.price)}</span>
                                    <span>x {item.quantity}</span>
                                    <span>{toIDRCurrency(item.subTotal)}</span>
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <RightLayout>
                <h2 className="p-4 text-lg font-bold">Payment</h2>
                <form className="px-4" onSubmit={handleOnSubmitButton}>
                    <p className="flex justify-between">
                        Total: <span className="text-md font-bold ">{toIDRCurrency(total)}</span>
                    </p>

                    {/* payment method */}
                    <div className="mt-4">
                        <p className="text-md font-bold">Payment Method</p>
                        <div className="mt-2 grid grid-cols-3 gap-4">
                            <div className="">
                                <input
                                    type="radio"
                                    id="cashMethod"
                                    name="paymentMethod"
                                    value="cash"
                                    className="peer hidden"
                                    checked={selectedPaymentMethod === "cash"}
                                    onChange={handleSelectedPaymentMethodChange}
                                />
                                <label
                                    htmlFor="cashMethod"
                                    className="py-2 border bg-background shadow-md rounded-lg flex flex-col items-center peer-disabled:opacity-50 peer-checked:border-black peer-checked:border-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 -960 960 960"
                                        fill="currentColor"
                                        className="text-interactive w-6 text-center "
                                    >
                                        <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                                    </svg>
                                    <p className="text-center text-sm">Cash</p>
                                </label>
                            </div>

                            <div className="">
                                <input
                                    type="radio"
                                    id="creditMethod"
                                    name="paymentMethod"
                                    value="credit"
                                    className="peer hidden"
                                    disabled
                                    checked={selectedPaymentMethod === "credit"}
                                    onChange={handleSelectedPaymentMethodChange}
                                />
                                <label
                                    htmlFor="creditMethod"
                                    className="py-2 border bg-background shadow-md rounded-lg flex flex-col items-center peer-disabled:opacity-50 peer-checked:border-black peer-checked:border-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 -960 960 960"
                                        fill="currentColor"
                                        className="text-interactive w-6 text-center"
                                    >
                                        <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" />
                                    </svg>
                                    <p className="text-center text-sm">Credit</p>
                                </label>
                            </div>

                            <div className="">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="eWalletMethod"
                                    value="credit"
                                    className="peer hidden"
                                    disabled
                                    checked={selectedPaymentMethod === "eWallet"}
                                    onChange={handleSelectedPaymentMethodChange}
                                />
                                <label
                                    htmlFor="eWalletMethod"
                                    className="py-2 border bg-background shadow-md rounded-lg flex flex-col items-center peer-disabled:opacity-50 peer-checked:border-black peer-checked:border-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 -960 960 960"
                                        fill="currentColor"
                                        className="text-interactive w-6 text-center"
                                    >
                                        <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
                                    </svg>
                                    <p className="text-center text-sm">E-Wallet</p>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 py-2 px-4 w-full bg-interactive rounded-lg font-bold hover:bg-primary hover:text-white"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </form>
            </RightLayout>
        </main>
    );
}
