import { Product } from "./Product";

export type Cart = {
    dataCart: DataCart[];
    total: number;
};

export type DataCart = {
    product: Product;
    quantity: number;
    subTotal: number;
};
