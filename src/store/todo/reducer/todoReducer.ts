import { Actions } from "../actions";
import { ActionType } from "../action-types";
import { Todo } from "../interface";

interface TodoState {
  loading: boolean;
  todos: Todo[];
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
        todos: [],
      };

    case ActionType.GET_TODOS_ERROR:
      return {
        ...state,
        loading: false,
        todos: [],
      };
    default:
      return state;
  }
};

export default reducer;
