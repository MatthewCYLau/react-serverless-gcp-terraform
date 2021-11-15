import { ActionType } from "../action-types";
import { User } from "../interface";

interface UserLoadedAction {
  type: ActionType.USER_LOADED;
  payload: User;
}
interface AuthErrorAction {
  type: ActionType.AUTH_ERROR;
  payload: {};
}

interface RegistrationSuccessAction {
  type: ActionType.REGISTRATION_SUCCESS;
  payload: {};
}

interface RegistrationFailedAction {
  type: ActionType.REGISTRATION_FAILED;
  payload: {};
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: {};
}

interface LoginFailedAction {
  type: ActionType.LOGIN_FAILED;
  payload: {};
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}

export type Actions =
  | UserLoadedAction
  | AuthErrorAction
  | RegistrationSuccessAction
  | RegistrationFailedAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction;
