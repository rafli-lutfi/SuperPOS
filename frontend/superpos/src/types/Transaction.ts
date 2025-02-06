export type Transaction = {
    id: string;
    total_amount: number;
    total_pay: number | null;
    created_at: string;
    paid_at: string | null;
    details: TransactionItem[] | null;
};

export type TransactionItem = {
    id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    sub_total: number;
    image_url: string;
};
