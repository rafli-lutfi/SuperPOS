import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { increaseQuantity, decreaseQuantity, deleteItem } from "@/libs/features/cart/cartSlice";
import Image from "next/image";
import { Product } from "@/types/Product";
import { toIDRCurrency, truncateName } from "@/utils/formatter";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

// Animation variants for the cart items
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
            mass: 1,
        },
    },
};

export default function Cart() {
    const dispatch = useAppDispatch();
    const { dataCart, total } = useAppSelector((state) => state.cartSlice);
    const cartContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom of cart when items added or removed
    useEffect(() => {
        if (cartContainerRef.current) {
            cartContainerRef.current.scrollTo({
                top: cartContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [dataCart.length]);

    // Event handlers
    const handleCartAction = useCallback(
        (action: "increase" | "decrease" | "delete", product: Product) => {
            const actions = {
                increase: () => dispatch(increaseQuantity(product)),
                decrease: () => dispatch(decreaseQuantity(product)),
                delete: () => dispatch(deleteItem(product)),
            };
            actions[action]();
        },
        [dispatch]
    );

    return (
        <>
            <h2 className="p-4 text-lg font-bold">Current Order</h2>
            <div className="flex h-full flex-1 flex-col justify-between">
                <div
                    ref={cartContainerRef}
                    className="mx-2 flex h-full max-h-[75vh] flex-col gap-2 overflow-y-auto pb-8"
                >
                    {dataCart.map((item, index) => (
                        <motion.div
                            key={item.product.id}
                            className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-background px-4 py-2 shadow-lg laptop:flex-nowrap"
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
                                className="mx-auto rounded-lg"
                            />
                            <div className="w-full">
                                <p className="text-sm">{truncateName(item.product.name, 20)}</p>

                                <div className="mt-2 flex items-center justify-between">
                                    {/* quantity */}
                                    <div className="flex">
                                        <button
                                            className="rounded-l-2xl border bg-white px-2 py-1 shadow disabled:bg-slate-200"
                                            onClick={() => handleCartAction("decrease", item.product)}
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
                                        <p className="w-8 bg-white text-center text-sm shadow">{item.quantity}</p>
                                        <button
                                            className="rounded-r-2xl border bg-white px-2 py-1 shadow disabled:bg-slate-200"
                                            onClick={() => handleCartAction("increase", item.product)}
                                            disabled={item.quantity >= item.product.stock}
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
                                    <button onClick={() => handleCartAction("delete", item.product)}>
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

                                <p className="mt-2 flex justify-between text-xs">
                                    <span>{toIDRCurrency(item.product.price)}</span>
                                    <span>x {item.quantity}</span>
                                    <span>{toIDRCurrency(item.subTotal)}</span>
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mx-2 mb-2 flex h-fit flex-shrink-0 flex-col justify-between gap-2">
                    <p className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span>{toIDRCurrency(total)}</span>
                    </p>
                    <Link href="/order/payment">
                        <button
                            className="w-full rounded-lg bg-interactive px-4 py-2 font-bold hover:bg-primary hover:text-white disabled:bg-slate-300 disabled:hover:text-black"
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
