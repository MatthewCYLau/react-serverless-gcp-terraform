import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";
import { AuthBody, AuthResponse } from "../interface";
import { API_BASE_URL } from "../../../constants";
import setAuthToken from "../../../utils/setAuthToken";

export const login = ({ username = "", password = "" }: AuthBody) => {
  return async (dispatch: Dispatch<Actions>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    try {
      await axios.post(`${API_BASE_URL}/auth`, body, config);
      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: {},
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: ActionType.LOGIN_FAILED,
      });
    }
  };
};

export const register = (authBody: AuthBody) => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      const { username, password } = authBody;
      await axios.post(`${API_BASE_URL}/users`, {
        username,
        password,
      });
      dispatch({
        type: ActionType.REGISTRATION_SUCCESS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: ActionType.REGISTRATION_FAILED,
        payload: {},
      });
    }
  };
};

export const loadUser = () => {
  return async (dispatch: Dispatch<Actions>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res: AxiosResponse<AuthResponse> = await axios.get("/api/auth");
      dispatch({
        type: ActionType.USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: {},
      });
    }
  };
};

export const logout = () => (dispatch: Dispatch<Actions>) => {
  dispatch({ type: ActionType.LOGOUT });
};
