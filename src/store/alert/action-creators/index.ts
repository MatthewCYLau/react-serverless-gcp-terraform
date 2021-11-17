import { v4 as uuid } from "uuid";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";

export const setAlert = (message: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.SET_ALERT,
      payload: {
        id: uuid(),
        message,
      },
    });
  };
};

export const removeAlert = (id: string) => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.REMOVE_ALERT,
      payload: id,
    });
  };
};

export const removeAllAlert = () => {
  return (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.REMOVE_ALL_ALERT,
    });
  };
};
