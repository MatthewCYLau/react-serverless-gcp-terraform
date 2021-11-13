import { combineReducers } from "redux";
import authReducer from "../auth/reducer/authReducer";
import todoReducer from "../todo/reducer/todoReducer";

const reducers = combineReducers({
  authState: authReducer,
  todoState: todoReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
