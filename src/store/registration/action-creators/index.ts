import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";

interface RegistrationBody {
  username: string;
  password: string;
}

export const register = (registrationBody: RegistrationBody) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.REGISTRATION_REQUEST,
      payload: {},
    });
    try {
      const { username, password } = registrationBody;
      await axios.post(
        `https://europe-west2-react-gke-terraform.cloudfunctions.net/users-api/users`,
        {
          username,
          password,
        }
      );
      dispatch({
        type: ActionType.REGISTRATION_REQUEST_SUCCESS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: ActionType.REGISTRATION_REQUEST_ERROR,
        payload: {},
      });
    }
  };
};
