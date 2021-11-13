import * as authActionCreators from "./auth/action-creators";
import * as todoActionCreators from "./todo/action-creators";

export * from "./store";
export * from "./reducers";

const combinedActionCreators = {
  ...authActionCreators,
  ...todoActionCreators,
};

export default combinedActionCreators;
