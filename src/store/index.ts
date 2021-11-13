import * as authActionCreators from "./auth/action-creators";
// import * as registrationActionCreators from "./registration/action-creators";

export * from "./store";
export * from "./reducers";

const combinedActionCreators = {
  ...authActionCreators,
  // ...registrationActionCreators,
};

export default combinedActionCreators;
