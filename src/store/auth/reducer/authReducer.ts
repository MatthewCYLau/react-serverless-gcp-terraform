import { Actions } from "../actions";
import { ActionType } from "../action-types";
import { User } from "../interface";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
}

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const reducer = (
  state: AuthState = initialState,
  action: Actions
): AuthState => {
  switch (action.type) {
    case ActionType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case ActionType.REGISTRATION_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem("token", "foo-bar");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ActionType.REGISTRATION_FAILED:
    case ActionType.AUTH_ERROR:
    case ActionType.LOGIN_FAILED:
    case ActionType.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
