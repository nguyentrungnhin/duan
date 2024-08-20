// import { configureStore } from '@reduxjs/toolkit';
// import cartSlice from './slices/cartslices';
// import userSlices from './slices/userSlices';

// export const store = configureStore({
//     reducer: {
//         auth: userSlices,
//         cart: cartSlice.reducer,
//     }
// })
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlices from "./slices/userSlices";
import cartslices from "./slices/cartslices";


const persistConfig = {
    key: "root",
    storage,
};


const rootReducer = combineReducers({
    auth: userSlices,
    cart: cartslices,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
});


export const persistor = persistStore(store);