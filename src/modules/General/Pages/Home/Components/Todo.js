// @flow
import React from 'react';

type TodoProps = {
    state: "COMPLETED" | "ACTIVE",
    onStateChange: Function,
    description: string,
    onDelete: Function,
};

const Todo = (props: TodoProps) => {
    return (
        <li className={props.state === 'COMPLETED' ? "completed" : undefined}>
            <div className="view">
                <input className="toggle" type="checkbox"
                       checked={props.state === 'COMPLETED'}
                       onChange={props.onStateChange} />
                <label>{props.description}</label>
                <button className="destroy" onClick={props.onDelete}/>
            </div>
            {/*<input className="edit" value="adad" />*/}
        </li>
    );
};

export default Todo;
