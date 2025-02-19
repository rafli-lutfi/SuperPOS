import { Cart } from "@/types/Cart";
import { Product } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Cart = {
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
        resetCart: (state) => {
            state.dataCart = [];
            state.total = 0;
        },
    },
});

export const { addItem, increaseQuantity, decreaseQuantity, deleteItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
