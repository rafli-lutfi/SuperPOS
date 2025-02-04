export type Transaction = {
    id: number;
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
    product_quantity: number;
    sub_total: number;
};
