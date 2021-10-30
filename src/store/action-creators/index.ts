import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Actions } from "../actions";

export const calculateIsEven =
  (input: string) => async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.CALCULATE_ISEVEN,
      payload: {
        input,
      },
    });

    try {
      if (input != null && input !== "" && !isNaN(Number(input.toString()))) {
        const isEven = parseInt(input, 10) % 2 === 0;
        dispatch({
          type: ActionType.CALCULATE_ISEVEN_SUCCESS,
          payload: {
            isEven,
          },
        });
      } else {
        dispatch({
          type: ActionType.CALCULATE_ISEVEN_ERROR,
          payload: {
            error: "Input is not an integer",
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.CALCULATE_ISEVEN_ERROR,
        payload: err.message,
      });
    }
  };
