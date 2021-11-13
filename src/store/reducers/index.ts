import { combineReducers } from "redux";
import authReducer from "../auth/reducer/authReducer";

const reducers = combineReducers({
  authState: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
