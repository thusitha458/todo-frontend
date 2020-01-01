// @flow
import type { ApplicationState } from "../../../../../store/reducers";
import type {Todo} from "../../../../../shared/types/Todo";
import {createSelector} from "reselect";

export const getFilteredTodos = createSelector(
    (state: ApplicationState) => state.todos.filter,
    (state: ApplicationState) => state.todos.todos,
    (filter: "ALL" | "ACTIVE" | "COMPLETED", todos: Array<Todo>) => {
        switch (filter) {
            case "ALL":
                return todos;
            case "ACTIVE":
                return todos.filter(todo => todo.state === "ACTIVE");
            case "COMPLETED":
                return todos.filter(todo => todo.state === "COMPLETED");
            default:
                return todos;
        }
    },
);
