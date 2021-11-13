import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";

export const register = () => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.REGISTRATION_REQUEST,
      payload: {},
    });
    try {
      const { data } = await axios.get(
        `https://europe-west2-react-gke-terraform.cloudfunctions.net/users-api/users`
      );
      console.log(data);
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
