import { ActionType } from "../action-types";

interface GetTodosSuccessAction {
  type: ActionType.GET_TODOS_SUCCESS;
  payload: {};
}

interface GetTodosErrorAction {
  type: ActionType.GET_TODOS_ERROR;
  payload: {};
}

export type Actions = GetTodosSuccessAction | GetTodosErrorAction;
