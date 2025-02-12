"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, Variants } from "motion/react";
import { usePathname } from "next/navigation";

const ulVariants: Variants = {
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

const liVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            default: { type: "spring", stiffness: 200 },
        },
    },
};

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex flex-col border-r bg-white">
            <Image src={"/logo-2.png"} alt="logo" width={90} height={90} className="mx-auto mt-6 px-1" />
            <motion.ul className="mt-6 space-y-4" initial="hidden" animate="visible" variants={ulVariants}>
                <motion.li variants={liVariants} whileHover={{ scale: 0.9 }}>
                    <Link
                        href="/order"
                        className={`group mx-2 block rounded-lg px-1 py-2 hover:bg-interactive ${
                            pathname === "/order" ? "bg-interactive" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            className={`mx-auto w-5 min-w-5 text-main-text group-hover:text-background ${
                                pathname === "/order" ? "text-background" : ""
                            }`}
                        >
                            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                        </svg>
                        <p
                            className={`mt-1 text-center text-xs text-main-text group-hover:text-background ${
                                pathname === "/order" ? "text-background" : ""
                            }`}
                        >
                            Order
                        </p>
                    </Link>
                </motion.li>
                <motion.li variants={liVariants} whileHover={{ scale: 0.9 }}>
                    <Link
                        href="/history"
                        className={`group mx-2 block rounded-lg px-1 py-2 hover:bg-interactive ${
                            pathname === "/history" ? "bg-interactive" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            className={`mx-auto w-5 min-w-5 text-main-text group-hover:text-background ${
                                pathname === "/history" ? "text-background" : ""
                            }`}
                        >
                            <path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                        </svg>
                        <p
                            className={`mt-1 text-center text-xs text-main-text group-hover:text-background ${
                                pathname === "/history" ? "text-backgroung" : ""
                            }`}
                        >
                            History
                        </p>
                    </Link>
                </motion.li>
                <motion.li variants={liVariants} whileHover={{ scale: 0.9 }}>
                    <Link
                        href="/product"
                        className={`group mx-2 block rounded-lg px-1 py-2 hover:bg-interactive ${
                            pathname === "/product" ? "bg-interactive" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            className={`mx-auto w-5 min-w-5 text-main-text group-hover:text-background ${
                                pathname === "/product" ? "text-background" : ""
                            }`}
                        >
                            <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" />
                        </svg>
                        <p
                            className={`mt-1 text-center text-xs text-main-text group-hover:text-background ${
                                pathname === "/product" ? "text-background" : ""
                            }`}
                        >
                            Product
                        </p>
                    </Link>
                </motion.li>
                <motion.li variants={liVariants} whileHover={{ scale: 0.9 }}>
                    <Link
                        href="/category"
                        className={`group mx-2 block rounded-lg px-1 py-2 hover:bg-interactive ${
                            pathname === "/category" ? "bg-interactive" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                            className={`mx-auto w-5 min-w-5 text-main-text group-hover:text-background ${
                                pathname === "/category" ? "text-background" : ""
                            }`}
                        >
                            <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
                        </svg>
                        <p
                            className={`mt-1 text-center text-xs text-main-text group-hover:text-background ${
                                pathname === "/category" ? "text-background" : ""
                            }`}
                        >
                            Category
                        </p>
                    </Link>
                </motion.li>
            </motion.ul>
        </aside>
    );
}
