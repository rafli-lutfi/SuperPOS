import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { increaseQuantity, decreaseQuantity, deleteItem } from "@/libs/features/cart/cartSlice";
import Image from "next/image";
import { Product } from "@/types/Product";
import { capitalizeEachWord, toIDRCurrency } from "@/utils/formatter";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { useEffect, useRef } from "react";

const cartVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 100,
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

export default function Cart() {
    const { dataCart, total } = useAppSelector((state) => state.cartSlice);
    const dispatch = useAppDispatch();

    const handleIncreaseQtyButton = (product: Product) => {
        dispatch(increaseQuantity(product));
    };

    const handleDecreaseQtyButton = (product: Product) => {
        dispatch(decreaseQuantity(product));
    };

    const handleDeleteButton = (product: Product) => {
        dispatch(deleteItem(product));
    };

    const cartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cartContainerRef.current) {
            cartContainerRef.current.scrollTo({
                top: cartContainerRef.current.scrollHeight,
                behavior: "smooth", // Animasi scroll
            });
        }
    }, [dataCart.length]);

    return (
        <>
            <h2 className="p-4 text-lg font-bold">Current Order</h2>
            <div className="h-full flex-1 flex flex-col justify-between">
                <div
                    ref={cartContainerRef}
                    className="mx-2 pb-8 h-full max-h-[75vh] flex flex-col gap-2 overflow-y-auto"
                >
                    {dataCart.map((item, index) => (
                        <motion.div
                            key={item.product.id}
                            className="px-4 py-2 flex gap-4 bg-background items-center rounded-lg border border-slate-200 shadow-lg"
                            initial="hidden"
                            animate="visible"
                            variants={cartVariants}
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

                                <div className="mt-2 flex justify-between items-center">
                                    {/* quantity */}
                                    <div className="flex">
                                        <button
                                            className="px-2 py-1 rounded-l-2xl bg-white border disabled:bg-slate-200 shadow"
                                            onClick={() => handleDecreaseQtyButton(item.product)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 -960 960 960"
                                                fill="currentColor"
                                                className="w-3"
                                            >
                                                <path d="M200-440v-80h560v80H200Z" />
                                            </svg>
                                        </button>
                                        <p className="w-8 text-center text-sm bg-white shadow">{item.quantity}</p>
                                        <button
                                            className="px-2 py-1 rounded-r-2xl bg-white border shadow"
                                            onClick={() => handleIncreaseQtyButton(item.product)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 -960 960 960"
                                                fill="currentColor"
                                                className="w-3"
                                            >
                                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="" onClick={() => handleDeleteButton(item.product)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 -960 960 960"
                                            fill="currentColor"
                                            className="w-4 hover:text-error"
                                        >
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="mt-2 text-xs flex justify-between">
                                    <span>{toIDRCurrency(item.product.price)}</span>
                                    <span>x {item.quantity}</span>
                                    <span>{toIDRCurrency(item.subTotal)}</span>
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="h-fit mx-2 mb-2 flex-shrink-0 flex flex-col justify-between gap-2">
                    <p className="text-xl font-bold flex justify-between">
                        <span>Total:</span>
                        <span>{toIDRCurrency(total)}</span>
                    </p>
                    <Link href="/order/payment">
                        <button
                            className="px-4 py-2 w-full rounded-lg font-bold bg-interactive hover:text-white hover:bg-primary disabled:bg-slate-300 disabled:hover:text-black"
                            disabled={dataCart.length < 1}
                        >
                            Proceed to Payment
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
