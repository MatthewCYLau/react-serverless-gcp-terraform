import axios from "axios";
import { Dispatch } from "redux";
import { ActionType as RegistrationActionType } from "../action-types";
import { ActionType as AuthActionType } from "../../auth/action-types";
import { Actions as RegistrationAction } from "../actions";
import { Actions as AuthActions } from "../../auth/actions";
import { API_BASE_URL } from "../../../constants";

interface RegistrationBody {
  username: string;
  password: string;
}

export const register = (registrationBody: RegistrationBody) => {
  return async (dispatch: Dispatch<RegistrationAction | AuthActions>) => {
    dispatch({
      type: RegistrationActionType.REGISTRATION_REQUEST,
      payload: {},
    });
    try {
      const { username, password } = registrationBody;
      await axios.post(`${API_BASE_URL}/users`, {
        username,
        password,
      });
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: RegistrationActionType.REGISTRATION_REQUEST_ERROR,
        payload: {},
      });
    }
  };
};
