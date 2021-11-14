import { ActionType } from "../action-types";
// import { Todo } from "../interface";

interface GetTodosSuccessAction {
  type: ActionType.GET_TODOS_SUCCESS;
  payload: any;
}

interface GetTodosErrorAction {
  type: ActionType.GET_TODOS_ERROR;
  payload: {};
}

export type Actions = GetTodosSuccessAction | GetTodosErrorAction;
