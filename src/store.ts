import { configureStore } from "@reduxjs/toolkit";

import userSlice, { UserState } from "./redux-toolkit/user/user-slice";
import orderSlice, { OrderState } from "./redux-toolkit/order/order-slice";
import authSlice, { AuthState } from "./redux-toolkit/auth/auth-slice";

export interface RootState {
    admin: AdminState;
    auth: AuthState;
    cart: CartState;
    order: OrderState;
    user: UserState;
}

export const storeReducer = {
    auth: authSlice,
    order: orderSlice,
    user: userSlice,
};

export const store = configureStore({
    reducer: storeReducer
});
