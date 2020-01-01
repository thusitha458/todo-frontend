// @flow
import React from 'react';

type TodoInputProps = {
    value: string,
    onChange: Function,
    onPressEnter: Function,
};

const TodoInput = (props: TodoInputProps) => {
    return (
        <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={props.value}
            onChange={props.onChange}
            onKeyUp={e => {
                if (e.keyCode === 13) {
                    props.onPressEnter();
                }
            }}
        />
    );
};

export default TodoInput;
