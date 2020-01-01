// @flow
import React from 'react';

type TodoCountProps = {
    value: string,
};

const TodoCount = (props: TodoCountProps) => {
    return (
        <span className="todo-count">
          <strong>{props.value}</strong>
          <span> </span>
          <span>items</span>
          <span> left</span>
        </span>
    );
};

export default TodoCount;
