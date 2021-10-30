import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";

export const loginSuccess = () => async (dispatch: Dispatch<Actions>) => {
  dispatch({
    type: ActionType.AUTH_REQUEST_SUCCESS,
    payload: {},
  });
};
