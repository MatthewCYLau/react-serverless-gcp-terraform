import { ActionType } from "../action-types";

interface GetTodosSuccessAction {
  type: ActionType.GET_TODOS_SUCCESS;
  payload: any;
}

interface GetTodosErrorAction {
  type: ActionType.GET_TODOS_ERROR;
  payload: {};
}

interface CreateTodoSuccessAction {
  type: ActionType.CREATE_TODO_SUCCESS;
  payload: {};
}

interface CreateTodoErrorAction {
  type: ActionType.CREATE_TODO_ERROR;
  payload: {};
}

export type Actions =
  | GetTodosSuccessAction
  | GetTodosErrorAction
  | CreateTodoSuccessAction
  | CreateTodoErrorAction;
