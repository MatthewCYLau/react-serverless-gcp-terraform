import { combineReducers } from "redux";
import authReducer from "./authReducer";

const reducers = combineReducers({
  authState: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
