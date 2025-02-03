import { Product } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartType = {
    dataCart: {
        product: Product;
        quantity: number;
        subTotal: number;
    }[];
    total: number;
};

const initialState: CartType = {
    dataCart: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const id = action.payload.id;
            const existingItem = state.dataCart.find((item) => item.product.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.subTotal += existingItem.product.price;
            } else {
                state.dataCart.push({ product: action.payload, quantity: 1, subTotal: action.payload.price });
            }
            state.total += action.payload.price;
        },
        increaseQuantity: (state, action: PayloadAction<Product>) => {
            const id = action.payload.id;
            const existingItem = state.dataCart.find((item) => item.product.id === id);

            if (existingItem && existingItem.product.stock > existingItem.quantity) {
                existingItem.quantity += 1;
                existingItem.subTotal += existingItem.product.price;
                state.total += existingItem.product.price;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<Product>) => {
            const id = action.payload.id;
            const existingItem = state.dataCart.find((item) => item.product.id === id);

            if (existingItem && existingItem.quantity > 0) {
                existingItem.quantity -= 1;
                existingItem.subTotal -= existingItem.product.price;
                state.total -= existingItem.product.price;
            }
        },
        deleteItem: (state, action: PayloadAction<Product>) => {
            const id = action.payload.id;
            const existingItem = state.dataCart.find((item) => item.product.id === id);

            if (existingItem) {
                state.total -= action.payload.price * existingItem?.quantity;
            }

            state.dataCart = state.dataCart.filter((item) => item.product.id !== id);
        },
    },
});

export const { addItem, increaseQuantity, decreaseQuantity, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
