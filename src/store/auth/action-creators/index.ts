import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";
import { AuthBody, User, Token } from "../interface";
import { API_BASE_URL } from "../../../constants";
import setAuthToken from "../../../utils/setAuthToken";
import { setAlert } from "../../alert/action-creators";

interface Error {
  message: string;
}

export const login = ({ username = "", password = "" }: AuthBody) => {
  return async (dispatch: Dispatch<Actions> | any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    try {
      const { data }: AxiosResponse<Token> = await axios.post(
        `${API_BASE_URL}/auth`,
        body,
        config
      );
      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: data,
      });
      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: ActionType.LOGIN_FAILED,
      });
      const errors: Error[] = err.response.data.errors;
      errors.forEach((error) => dispatch(setAlert(error.message)));
    }
  };
};

export const register = (authBody: AuthBody) => {
  return async (dispatch: Dispatch<Actions> | any) => {
    try {
      const { username, password } = authBody;
      const { data }: AxiosResponse<Token> = await axios.post(
        `${API_BASE_URL}/users`,
        {
          username,
          password,
        }
      );
      dispatch({
        type: ActionType.REGISTRATION_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.REGISTRATION_FAILED,
      });
      const errors: Error[] = err.response.data.errors;
      errors.forEach((error) => dispatch(setAlert(error.message)));
    }
  };
};

export const loadUser = () => {
  return async (dispatch: Dispatch<Actions>) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data }: AxiosResponse<User> = await axios.get(
        `${API_BASE_URL}/auth`
      );
      dispatch({
        type: ActionType.USER_LOADED,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.AUTH_ERROR,
      });
    }
  };
};

export const logout = () => (dispatch: Dispatch<Actions>) => {
  dispatch({ type: ActionType.LOGOUT });
};
