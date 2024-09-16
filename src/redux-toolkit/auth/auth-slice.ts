import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthErrors, LoadingStatus } from "../../types/types";
import {
    activateAccount,
    fetchResetPasswordCode,
    forgotPassword,
    login,
    registration,
    resetPassword
} from "./auth-thunks";

export interface AuthState {
    email: string;
    isRegistered: boolean;
    loadingState: LoadingStatus;
    success: string;
    error: string;
    errors: Partial<AuthErrors>;
    userId?: number;
    isToken: boolean;
    isAtivo: boolean;
}

export const initialState: AuthState = {
    email: "",
    isRegistered: false,
    loadingState: LoadingStatus.LOADING,
    success: "",
    error: "",
    errors: {},
    isToken: false,
    isAtivo: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoadingState(state, action: PayloadAction<LoadingStatus>) {
            state.loadingState = action.payload.token;
            state.errors = {};
        },
        resetAuthState: () => initialState,
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token;  // Armazene o token ao fazer login
            state.isRegistered = true;
            state.success = "Login successful";
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(registration.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(registration.fulfilled, (state, action: PayloadAction<{ userId: number }>) => {
            state.isRegistered = true;
            state.loadingState = LoadingStatus.LOADED;
            state.userId = action.payload.userId;
            state.errors = {};
            state.isToken = action.payload.token;
            state.isAtivo = action.payload.active;
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.errors = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(activateAccount.fulfilled, (state, action) => {
            state.success = action.payload;
        });
        builder.addCase(activateAccount.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(forgotPassword.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.success = action.payload;
            state.loadingState = LoadingStatus.LOADED;
            state.errors = {};
            state.error = "";
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.error = action.payload!;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchResetPasswordCode.fulfilled, (state, action) => {
            state.email = action.payload;
        });
        builder.addCase(fetchResetPasswordCode.rejected, (state, action) => {
            state.error = action.payload!;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.success = action.payload;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.errors = action.payload!;
        });
    }
});

export const { setAuthLoadingState, resetAuthState, setToken } = authSlice.actions;
export default authSlice.reducer;
