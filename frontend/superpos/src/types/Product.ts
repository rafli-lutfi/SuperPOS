import { Category } from "./Category";

export type Product = {
    id: number;
    category: Category;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    image_url: string | null;
};
