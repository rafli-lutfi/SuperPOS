import { Product } from "@/types/Product";
import { capitalizeEachWord, toIDRCurrency, truncateName } from "@/utils/formatter";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "motion/react";

type ProductCardProps = {
    product: Product;
    onClickProduct: (product: Product) => void;
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

export default function ProductCard({ product, onClickProduct }: ProductCardProps) {
    return (
        <motion.button
            className="flex h-full flex-col rounded-lg border bg-white p-2 shadow-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 0.96 }}
            onClick={() => onClickProduct(product)}
        >
            <div className="w-full">
                <Image
                    src={product.image_url ?? "/default-product-image.png"}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="h-32 w-full lg:h-60"
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className="mt-4 flex h-full w-full flex-col justify-between">
                <p className="cursor-default text-left text-sm font-semibold">{product.name}</p>
                <div className="mt-3 flex items-center justify-between">
                    <p className="cursor-default text-sm">{toIDRCurrency(product.price)}</p>
                    <p
                        className="w-fit cursor-pointer text-wrap rounded-lg bg-interactive px-2 py-1 text-center text-xs text-background"
                        title={capitalizeEachWord(product.category.name)}
                    >
                        {truncateName(capitalizeEachWord(product.category.name))}
                    </p>
                </div>
            </div>
        </motion.button>
    );
}
