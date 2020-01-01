// @flow
import {
    GET_ALL_TODOS,
    GET_ALL_TODOS_SUCCESS,
    GET_ALL_TODOS_FAILED,
    SET_TODO_INPUT_VALUE,
    ADD_TODO,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILED,
    UPDATE_TODO_STATE,
    UPDATE_TODO_STATE_SUCCESS,
    UPDATE_TODO_STATE_FAILED,
    DELETE_TODO,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILED,
    DELETE_COMPLETED_TODOS,
    DELETE_COMPLETED_TODOS_SUCCESS,
    DELETE_COMPLETED_TODOS_FAILED,
    UPDATE_ALL_TODOS_STATE,
    UPDATE_ALL_TODOS_STATE_SUCCESS,
    UPDATE_ALL_TODOS_STATE_FAILED,
    SET_TODO_FILTER,
} from "./actionTypes";
import {ServiceManager} from "../../../../../shared/kernel/ServiceManager";
import {push} from "connected-react-router";

export const getAllTodos = () => async (dispatch, getState, serviceManager: ServiceManager) => {
    try {
        dispatch({type: GET_ALL_TODOS, payload: null});
        let response = await serviceManager.get('AppService').getAll();
        dispatch({type: GET_ALL_TODOS_SUCCESS, payload: response.todos});
    } catch (error) {
        dispatch({type: GET_ALL_TODOS_FAILED, payload: null});
    }
};

export const setTodoInputValue = (value: string) => {
    return {
        type: SET_TODO_INPUT_VALUE,
        payload: {value},
    };
};

export const addTodo = (description: string) => async (dispatch, getState, serviceManager: ServiceManager) => {
    try {
        dispatch({type: ADD_TODO, payload: {description}});
        let response = await serviceManager.get('AppService').addTodo(description);
        dispatch({type: ADD_TODO_SUCCESS, payload: response});
    } catch (error) {
        dispatch({type: ADD_TODO_FAILED, payload: null});
    }
};

export const updateAllTodosState = (state: "ACTIVE" | "COMPLETED") => async (dispatch, getState, serviceManager: ServiceManager) => {
    try {
        dispatch({type: UPDATE_ALL_TODOS_STATE, payload: {state}});
        await serviceManager.get('AppService').updateAllTodosState(state);
        let response = await serviceManager.get('AppService').getAll();
        dispatch({type: UPDATE_ALL_TODOS_STATE_SUCCESS, payload: response.todos});
    } catch (error) {
        dispatch({type: UPDATE_ALL_TODOS_STATE_FAILED, payload: {state}});
    }
};

export const updateTodoState = (id: string, state: "ACTIVE" | "COMPLETED") => async (dispatch, getState, serviceManager: ServiceManager) => {
    try {
        dispatch({type: UPDATE_TODO_STATE, payload: {id, state}});
        await serviceManager.get('AppService').updateTodoState(id, state);
        dispatch({type: UPDATE_TODO_STATE_SUCCESS, payload: {id, state}});
    } catch (error) {
        dispatch({type: UPDATE_TODO_STATE_FAILED, payload: {id, state}});
    }
};


export const deleteTodo = (id: string) => async (dispatch, getState, serviceManager: ServiceManager) => {
    try {
        dispatch({type: DELETE_TODO, payload: {id}});
        await serviceManager.get('AppService').deleteTodo(id);
        dispatch({type: DELETE_TODO_SUCCESS, payload: {id}});
    } catch (error) {
        dispatch({type: DELETE_TODO_FAILED, payload: {id}});
    }
};

export const deleteCompletedTodos = () => async (dispatch, getState, serviceManager: ServiceManager) => {
    try {
        dispatch({type: DELETE_COMPLETED_TODOS, payload: null});
        await serviceManager.get('AppService').deleteTodosByState("COMPLETED");
        let response = await serviceManager.get('AppService').getAll();
        dispatch({type: DELETE_COMPLETED_TODOS_SUCCESS, payload: response.todos});
    } catch (error) {
        dispatch({type: DELETE_COMPLETED_TODOS_FAILED, payload: null});
    }
};

export const setInitialFilter = (filter: 'ALL' | 'ACTIVE' | 'COMPLETED') => {
    return {
        type: SET_TODO_FILTER,
        payload: filter,
    };
};

export const changeFilter = (filter: 'ALL' | 'ACTIVE' | 'COMPLETED') => dispatch => {
    dispatch({type: SET_TODO_FILTER, payload: {filter}});
    dispatch(push(filter === 'ALL' ? '/' : `/?state=${filter}`));
};
