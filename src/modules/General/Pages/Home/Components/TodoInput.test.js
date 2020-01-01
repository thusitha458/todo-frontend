/* eslint-disable */
import React from "react";
import {mount} from "enzyme";
import TodoInput from "./TodoInput";

it('should show value', done => {
    const wrapper = mount(<TodoInput value="hello" onChange={() => {}} />);
    const input = wrapper.find("input");
    expect(input.instance().value).toBe("hello");
    done();
});

it('should change value', done => {
    let value = "hello";
    const wrapper = mount(<TodoInput value={value} onChange={e => {value = e.target.value;}} />);
    const input = wrapper.find("input");
    input.simulate('focus');
    input.simulate('change', {target: {value: 'changed'}});
    expect(value).toBe("changed");
    done();
});
