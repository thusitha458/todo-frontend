/* eslint-disable */
import React from "react";
import {shallow} from "enzyme";
import TodoCount from "./TodoCount";

it('should render todo count', () => {
    const wrapper = shallow(<TodoCount value={5}/>);
    const strong = wrapper.find("strong");
    const result = strong.text();

    expect(result).toBe("5");
});
