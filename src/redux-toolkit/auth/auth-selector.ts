import { AuthErrors, LoadingStatus } from "../../types/types";
import { RootState } from "../../store";
import { AuthState } from "./auth-slice";

export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectUserAuthEmail = (state: RootState): string => selectAuthState(state).email;
export const selectSuccessMessage = (state: RootState): string => selectAuthState(state).success;
export const selectErrorMessage = (state: RootState): string => selectAuthState(state).error;
export const selectErrors = (state: RootState): Partial<AuthErrors> => selectAuthState(state).errors;
export const selectUserId = (state: RootState): number | null => selectAuthState(state).userId;
export const selectIsAuthLoading = (state: RootState): boolean => selectAuthState(state).loadingState === LoadingStatus.LOADING;
export const selectAuthTokenValido = (state: RootState): boolean => selectAuthState(state).isToken;
export const selectUserStatus = (state: RootState): boolean => selectAuthState(state).isAtivo;
