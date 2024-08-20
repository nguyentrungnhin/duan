// //cartslices
// import { createSlice, payLoadAction } from '@reduxjs/toolkit';

// const initialState = {
//     items: [],
// }

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const existingItem = state.items.find((item) => item._id === action.payload.item._id);

//             if (existingItem) {
//                 existingItem.quantity =Number(existingItem.quantity)+ Number(action.payload.quantity);
//             } else {
//                 state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
//             }
//         },
//         removeFromCart: (state, action) => {
//             state.items = state.items.filter((item) => item._id !== action.payload);
//         },
//         updateCartItemQuantity: (state, action) => {
//             const item = state.items.find((item) => item._id === action.payload._id);

//             if (item) {
//                 item.quantity = action.payload.quantity;
//             }
//         },
//         clearCart: (state) => {
//             state.items = [];
//         },
//     },
// });

// export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

// export default cartSlice;
const { createSlice } = require("@reduxjs/toolkit");
export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addItem: (state, actions) => {
            const { product, quantity, size } = actions.payload;
            const cart = state;
            const index = cart.findIndex(
                (item) => item._id == product._id && item.size == size
            );
            if (index == -1) {
                //Chưa có -> thêm vào
                cart.push({ ...product, quantity, size });
            } else {
                //Đã có -> tăng số lượng
                cart[index].quantity = Number(cart[index].quantity) + Number(quantity);
            }
            state = cart;
            return state;
        },
        removeItem: (state, actions) => {
            const { product, size } = actions.payload;
            const cart = state;
            const index = cart.findIndex(
                (item) => item._id == product._id && item.size == size
            );
            cart.splice(index, 1);
            return cart;
        },
        removeCart: (state) => (state = []),
        updateItem: (state, actions) => {
            const { product, quantity, size } = actions.payload;
            const cart = state;
            const index = cart.findIndex(
                (item) => item._id == product._id && item.size == size
            );
            cart[index].quantity = Math.max(1, quantity);
            return cart;
        },
    },
});
export const { addItem, removeItem, removeCart, updateItem } = cartSlice.actions;
export default cartSlice.reducer;