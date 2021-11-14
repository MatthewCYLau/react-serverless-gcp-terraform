import { Actions } from "../actions";
import { ActionType } from "../action-types";
import { TodosList } from "../interface";

interface TodoState {
  loading: boolean;
  todos: TodosList;
}

const initialState = {
  loading: true,
  todos: [],
};

const reducer = (
  state: TodoState = initialState,
  action: Actions
): TodoState => {
  switch (action.type) {
    case ActionType.GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case ActionType.GET_TODOS_ERROR:
    case ActionType.DELETE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        todos: [],
      };
    case ActionType.CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
