import { Product } from "@/types/Product";
import { capitalizeEachWord, toIDRCurrency, truncateName } from "@/utils/formatter";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "motion/react";
import { DataCart } from "@/types/Cart";

type ProductCardProps = {
    product: Product;
    onClickProduct: (product: Product) => void;
    cartItem?: DataCart;
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 100,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            default: { type: "spring", stiffness: 200 },
        },
    },
};

export default function ProductCard({ product, onClickProduct, cartItem }: ProductCardProps) {
    const isDisabled = product.stock === 0 || (cartItem?.quantity ?? 0) >= product.stock;

    return (
        <motion.button
            className={`flex h-full flex-col rounded-lg border bg-white p-2 shadow-md ${isDisabled ? "cursor-not-allowed brightness-75" : "hover:shadow-lg"}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={!isDisabled ? { scale: 0.96 } : {}}
            onClick={() => !isDisabled && onClickProduct(product)}
            disabled={isDisabled}
        >
            <div className="w-full">
                <Image
                    src={product.image_url ?? "/default-product-image.png"}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="mx-auto h-44 w-44"
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className="mt-4 flex h-full w-full flex-col justify-between">
                <p className="text-left text-sm font-semibold">{truncateName(product.name, 40)}</p>
                <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm">{toIDRCurrency(product.price)}</p>
                    <p
                        className="w-fit text-wrap rounded-lg bg-interactive px-2 py-1 text-center text-xs text-background"
                        title={capitalizeEachWord(product.category.name)}
                    >
                        {truncateName(capitalizeEachWord(product.category.name))}
                    </p>
                </div>
            </div>
            <p className="mt-4 text-left text-xs">stock: {product.stock} left</p>
        </motion.button>
    );
}
