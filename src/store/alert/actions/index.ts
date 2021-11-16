import { ActionType } from "../action-types";

interface SetAlertAction {
  type: ActionType.SET_ALERT;
  payload: {
    id: string;
    message: string;
  };
}

interface RemoveAlertAction {
  type: ActionType.REMOVE_ALERT;
  payload: string;
}

interface RemoveAllAlertAction {
  type: ActionType.REMOVE_ALL_ALERT;
}

export type Actions = SetAlertAction | RemoveAlertAction | RemoveAllAlertAction;
