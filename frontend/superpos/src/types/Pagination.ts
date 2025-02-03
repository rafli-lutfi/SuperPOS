export type Pagination<T, K extends string> = {
    [key in K]: T[]; // Properti dinamis (products, categories, dll.)
} & {
    page: number;
    size: number;
    total_page: number;
    total_elements: number;
    is_first: boolean;
    is_last: boolean;
};
