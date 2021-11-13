import { ActionType } from "../action-types";

interface AuthRequestAction {
  type: ActionType.AUTH_REQUEST;
  payload: {};
}

interface AuthRequestSuccessAction {
  type: ActionType.AUTH_REQUEST_SUCCESS;
  payload: {};
}

interface AuthRequestErrorAction {
  type: ActionType.AUTH_REQUEST_ERROR;
  payload: {};
}

export type Actions =
  | AuthRequestAction
  | AuthRequestSuccessAction
  | AuthRequestErrorAction;
