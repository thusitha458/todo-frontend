// @flow
import {Action} from "../../../../../shared/types/ReducerAction";
import {Todo} from "../../../../../shared/types/Todo";
import {
    GET_ALL_TODOS_SUCCESS,
    SET_TODO_INPUT_VALUE,
    ADD_TODO_SUCCESS,
    UPDATE_TODO_STATE_SUCCESS,
    DELETE_TODO_SUCCESS,
    DELETE_COMPLETED_TODOS_SUCCESS,
    UPDATE_ALL_TODOS_STATE_SUCCESS,
    SET_TODO_FILTER,
} from "./actionTypes";

export type TodoState = {
    todoInputValue: string,
    todos: Array<Todo>,
    filter: "ALL" | "ACTIVE" | "COMPLETED",
};

const initialState: TodoState = {
    todoInputValue: '',
    todos: [],
    filter: "ALL",
};

export default (state: TodoState = initialState, {type, payload = {}}: Action) => {
    switch(type) {
        case GET_ALL_TODOS_SUCCESS:
            return {
                ...state,
                todos: payload,
            };
        case SET_TODO_INPUT_VALUE:
            return {
                ...state,
                todoInputValue: payload.value,
            };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, payload],
            };
        case UPDATE_TODO_STATE_SUCCESS:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo._id === payload.id) {
                        return {...todo, state: payload.state};
                    } else {
                        return todo;
                    }
                }),
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== payload.id),
            };
        case DELETE_COMPLETED_TODOS_SUCCESS:
        case UPDATE_ALL_TODOS_STATE_SUCCESS:
            return {
                ...state,
                todos: payload,
            };
        case SET_TODO_FILTER:
            return {
                ...state,
                filter: payload.filter,
            };
        default:
            return state;
    }
};
