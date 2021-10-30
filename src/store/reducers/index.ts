import { combineReducers } from 'redux';
import isEvenReducer from './isEvenReducer';

const reducers = combineReducers({
    isEvenState: isEvenReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
