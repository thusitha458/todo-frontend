// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth, { type AuthState } from "../modules/Auth/store/reducer";
import todos, {type TodoState} from "../modules/General/Pages/Home/store/reducer";

export type ApplicationState = {
  auth: AuthState,
  todos: TodoState,
};

export default (history: History) =>
  combineReducers({
    auth,
    todos,
    router: connectRouter(history)
  });
