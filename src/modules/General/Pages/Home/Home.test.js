/* eslint-disable */
import React from "react";
import {mount} from "enzyme";
import Home from "./index";
import Root from "../../../../Root";

let wrapper = null;

beforeEach(() => {
    const initialState = {
        todos: {
            filter: "ALL",
            todos: [
                {_id: 'todo-1', description: 'todo 1 description', state: 'ACTIVE'},
                {_id: 'todo-2', description: 'todo 2 description', state: 'ACTIVE'},
                {_id: 'todo-3', description: 'todo 3 description', state: 'COMPLETED'},
                {_id: 'todo-4', description: 'todo 4 description', state: 'ACTIVE'},
            ],
            todoInputValue: "",
        },
    };

    wrapper = mount(
        <Root initialState={initialState}>
            <Home location={{search: null}}/>
        </Root>
    );
});

afterEach(() => {
    wrapper && wrapper.unmount();
});

it('should have todo input', () => {
    expect(wrapper.find('.new-todo')).toHaveLength(1);
});

it('should have toggle all completed or active', () => {
    expect(wrapper.find('.toggle-all')).toHaveLength(1);
});

it('should have todo list', () => {
    expect(wrapper.find('.todo-list')).toHaveLength(1);
});

it('should have footer', () => {
    expect(wrapper.find('.footer')).toHaveLength(1);
});

it('should have filters', () => {
    expect(wrapper.find('.filters')).toHaveLength(1);
    expect(wrapper.find('.filters').find('li')).toHaveLength(3);
});

it('should select only one filter', () => {
    expect(wrapper.find('.filters').find('li').find('a.selected')).toHaveLength(1);
});

it('should render four todos', () => {
    expect(wrapper.find('.todo-list').find('li')).toHaveLength(4);
});

it('should render have one completed todo', () => {
    expect(wrapper.find('.todo-list').find('li.completed')).toHaveLength(1);
});

it('should render correct active todo count', () => {
    expect(wrapper.find('.todo-count')).toHaveLength(1);
    expect(wrapper.find('.todo-count').find('strong').text()).toBe("3");
});
