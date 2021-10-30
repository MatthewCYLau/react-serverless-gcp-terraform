import { Actions } from "../actions";
import { ActionType } from "../action-types";

interface CounterState {
  loading: boolean;
  error: string | null;
  inputs: string[];
  isEven: boolean;
}

const initialState = {
  loading: false,
  error: null,
  inputs: [],
  isEven: false,
};

const reducer = (
  state: CounterState = initialState,
  action: Actions
): CounterState => {
  switch (action.type) {
    case ActionType.CALCULATE_ISEVEN:
      return {
        ...state,
        inputs: [...state.inputs, action.payload.input],
        loading: true,
        error: null,
      };
    case ActionType.CALCULATE_ISEVEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isEven: action.payload.isEven,
      };
    case ActionType.CALCULATE_ISEVEN_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default reducer;
