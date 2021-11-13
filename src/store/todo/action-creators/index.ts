import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";
import { API_BASE_URL } from "../../../constants";

export const getTodos = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      await axios.get(`${API_BASE_URL}/todos`);
      dispatch({
        type: ActionType.GET_TODOS_SUCCESS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: ActionType.GET_TODOS_ERROR,
        payload: {},
      });
    }
  };
};
