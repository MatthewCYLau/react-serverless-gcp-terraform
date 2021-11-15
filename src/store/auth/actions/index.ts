import { ActionType } from "../action-types";
import { AuthResponse } from "../interface";

interface UserLoadedAction {
  type: ActionType.USER_LOADED;
  payload: AuthResponse;
}
interface AuthErrorAction {
  type: ActionType.AUTH_ERROR;
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
