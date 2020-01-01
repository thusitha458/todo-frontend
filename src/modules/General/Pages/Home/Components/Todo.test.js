/* eslint-disable */
import React from "react";
import {shallow} from "enzyme";
import Todo from "./Todo";

it('should show description', () => {
    const wrapper = shallow(<Todo description={"Todo description"}/>);
    const label = wrapper.find("label");
    const result = label.text();

    expect(result).toBe("Todo description");
});


