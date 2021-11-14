import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";
import { API_BASE_URL } from "../../../constants";
import { CreateTodoBody } from "../interface";

export const getTodos = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/todos`);
      // const todos = data.objects.map((result: any) => result.package.name);
      dispatch({
        type: ActionType.GET_TODOS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.GET_TODOS_ERROR,
        payload: {},
      });
    }
  };
};

export const createTodo = (createTodoBody: CreateTodoBody) => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/todos`);
      const { subject, body, owner } = createTodoBody;
      await axios.post(`${API_BASE_URL}/todos`, {
        subject,
        body,
        owner,
      });
      dispatch({
        type: ActionType.CREATE_TODO_SUCCESS,
        payload: {},
      });
      getTodos();
    } catch (err) {
      dispatch({
        type: ActionType.CREATE_TODO_ERROR,
        payload: {},
      });
    }
  };
};
