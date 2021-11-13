import { ActionType } from "../action-types";

interface RegistrationRequestAction {
  type: ActionType.REGISTRATION_REQUEST;
  payload: {};
}

interface RegistrationRequestSuccessAction {
  type: ActionType.REGISTRATION_REQUEST_SUCCESS;
  payload: {};
}

interface RegistrationRequestErrorAction {
  type: ActionType.REGISTRATION_REQUEST_ERROR;
  payload: {};
}

export type Actions =
  | RegistrationRequestAction
  | RegistrationRequestSuccessAction
  | RegistrationRequestErrorAction;
