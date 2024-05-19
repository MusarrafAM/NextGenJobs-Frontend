import { combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";
import { jobsReducer } from "./reducers/jobsReducer";
import { loaderReducer } from "./reducers/loaderReducer";

const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  loaderReducer: loaderReducer,
});

// See @redux-devtools/extension doc if need help
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Confuguer redux-devtools/extensio and apply middleware Thunk
);

export default store;
