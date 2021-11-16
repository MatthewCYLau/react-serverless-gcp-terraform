import { ActionType } from "../action-types";
import { User, Token } from "../interface";

interface UserLoadedAction {
  type: ActionType.USER_LOADED;
  payload: User;
}
interface AuthErrorAction {
  type: ActionType.AUTH_ERROR;
}

interface RegistrationSuccessAction {
  type: ActionType.REGISTRATION_SUCCESS;
  payload: Token;
}

interface RegistrationFailedAction {
  type: ActionType.REGISTRATION_FAILED;
  payload: {};
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: Token;
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
