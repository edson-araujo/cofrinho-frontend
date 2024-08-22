import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./ActionType";
import { API_BASE_URL } from "../../config/api";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      window.location.reload();
    }
  } catch (error) {
    const backendErrors = error.response?.data || { general: 'Erro desconhecido' };
    dispatch({
      type: REGISTER_FAILURE,
      payload: backendErrors,
    });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signing`, userData);
    
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      window.location.reload();
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro desconhecido';
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }
};
