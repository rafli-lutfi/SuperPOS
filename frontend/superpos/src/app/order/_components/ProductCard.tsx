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
            className="p-2 h-full flex flex-col border bg-white shadow-md rounded-lg"
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
                    className="w-full h-32 lg:h-60"
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className="mt-4 h-full w-full flex flex-col justify-between">
                <p className="cursor-default text-left text-sm">{capitalizeEachWord(product.name)}</p>
                <div className="mt-3 flex justify-between items-center">
                    <p className="cursor-default text-sm">{toIDRCurrency(product.price)}</p>
                    <p
                        className="px-2 py-1 text-xs w-fit text-wrap text-center text-background bg-interactive rounded-lg cursor-pointer"
                        title={capitalizeEachWord(product.category.name)}
                    >
                        {truncateName(capitalizeEachWord(product.category.name))}
                    </p>
                </div>
            </div>
        </motion.button>
    );
}
