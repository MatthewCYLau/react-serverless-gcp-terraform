import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";

export const login = () => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.AUTH_REQUEST,
      payload: {},
    });
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      console.log(data);
      dispatch({
        type: ActionType.AUTH_REQUEST_SUCCESS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: ActionType.AUTH_REQUEST_ERROR,
        payload: {},
      });
    }
  };
};
