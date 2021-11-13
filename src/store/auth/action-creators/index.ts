import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";
import { RegistrationBody } from "../interface";
import { API_BASE_URL } from "../../../constants";

export const login = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      console.log(data);
      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: {},
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: ActionType.LOGIN_FAILED,
        payload: {},
      });
    }
  };
};

export const register = (registrationBody: RegistrationBody) => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      const { username, password } = registrationBody;
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
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      console.log(data);
      dispatch({
        type: ActionType.USER_LOADED,
        payload: {
          username: "foo-bar",
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: {},
      });
    }
  };
};
