import { ActionType } from "../action-types";

interface CalculateIsEvenAction {
  type: ActionType.CALCULATE_ISEVEN;
  payload: {
    input: string;
  };
}

interface CalculateIsEvenSuccessAction {
  type: ActionType.CALCULATE_ISEVEN_SUCCESS;
  payload: {
    isEven: boolean;
  };
}

interface CalculateIsEvenErrorAction {
  type: ActionType.CALCULATE_ISEVEN_ERROR;
  payload: {
    error: string;
  };
}

export type Actions =
  | CalculateIsEvenAction
  | CalculateIsEvenSuccessAction
  | CalculateIsEvenErrorAction;
