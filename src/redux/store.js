import { combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";
import { jobsReducer } from "./reducers/jobsReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { usersReducer } from "./reducers/usersReducer";

const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  loaderReducer: loaderReducer,
  usersReducer: usersReducer,
});

// See @redux-devtools/extension doc if need help
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Confuguer redux-devtools/extension and apply middleware Thunk
);

export default store;
