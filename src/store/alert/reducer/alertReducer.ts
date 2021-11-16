import { Actions } from "../actions";
import { ActionType } from "../action-types";

interface Alert {
  id: string;
  message: string;
}

interface AlertState {
  alerts: Alert[];
}

const initialState = {
  alerts: [],
};

const reducer = (
  state: AlertState = initialState,
  action: Actions
): AlertState => {
  switch (action.type) {
    case ActionType.SET_ALERT:
      return {
        alerts: [...state.alerts, action.payload],
      };
    case ActionType.REMOVE_ALERT:
      return {
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    case ActionType.REMOVE_ALL_ALERT:
      return {
        alerts: [],
      };
    default:
      return state;
  }
};

export default reducer;
