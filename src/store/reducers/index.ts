import { combineReducers } from "redux";
import authReducer from "../auth/reducer/authReducer";
import todoReducer from "../todo/reducer/todoReducer";
import alertReducer from "../alert/reducer/alertReducer";

const reducers = combineReducers({
  authState: authReducer,
  todoState: todoReducer,
  alertReducer: alertReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
