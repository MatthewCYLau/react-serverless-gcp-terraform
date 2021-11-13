import { Actions } from "../actions";
import { ActionType } from "../action-types";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const reducer = (
  state: AuthState = initialState,
  action: Actions
): AuthState => {
  switch (action.type) {
    case ActionType.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionType.AUTH_REQUEST_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
      };
    case ActionType.AUTH_REQUEST_ERROR:
      return {
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
