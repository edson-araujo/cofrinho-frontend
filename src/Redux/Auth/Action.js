import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "../../config/api";

export const register = (userData) => async (dispatch) => {
  debugger
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    debugger
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};
