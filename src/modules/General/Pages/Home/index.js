// @flow
import React, { PureComponent } from "react";
import TodoInput from "./Components/TodoInput";
import Todo from "./Components/Todo";
import TodoCount from "./Components/TodoCount";
import {connect} from "react-redux";
import {
  getAllTodos,
  setTodoInputValue,
  addTodo,
  updateTodoState,
  deleteTodo,
  deleteCompletedTodos,
  updateAllTodosState,
  setInitialFilter,
  changeFilter,
} from "./store/actions";
import {Todo as TodoType} from "../../../../shared/types/Todo";
import qs from "query-string";
import {getFilteredTodos} from "./store/selectors";

type HomeProps = {
  todos: Array<TodoType>,
  todoInputValue: string,
  filter: "ALL" | "ACTIVE" | "COMPLETED",
  location: Object,
  getAllTodos: Function,
  setTodoInputValue: Function,
  addTodo: Function,
  updateTodoState: Function,
  deleteTodo: Function,
  deleteCompletedTodos: Function,
  updateAllTodosState: Function,
  setInitialFilter: Function,
  changeFilter: Function,
};

class HomePage extends PureComponent<HomeProps> {
  componentDidMount(): void {
    let parsedQueryString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let filter = "ALL";
    if (parsedQueryString && parsedQueryString.state === "ACTIVE") {
      filter = "ACTIVE";
    } else if (parsedQueryString && parsedQueryString.state === "COMPLETED") {
      filter = "COMPLETED";
    }
    if (this.props.filter !== filter) {
      this.props.setInitialFilter({filter});
    }
    this.props.getAllTodos();
  }

  handleTodoInputOnChange = e => {
      this.props.setTodoInputValue(e.target.value);
  };

  handleTodoInputPressEnter = () => {
      if (this.props.todoInputValue !== '') {
        this.props.addTodo(this.props.todoInputValue);
        this.props.setTodoInputValue('');
      }
  };

  handleTogglingTodoState = (id: string, e) => {
      let newState = e.target.checked ? 'COMPLETED' : 'ACTIVE';
      this.props.updateTodoState(id, newState);
  };

  handleDeleteTodo = (id: string) => {
    this.props.deleteTodo(id);
  };

  handleDeleteCompletedTodos = () => {
    this.props.deleteCompletedTodos();
  };

  handleToggleStateOfAllTodos = e => {
    let newState = e.target.checked ? 'COMPLETED' : 'ACTIVE';
    this.props.updateAllTodosState(newState);
  };

  handleCategoryButtonClick = (filter, e) => {
    e.preventDefault();
    if (this.props.filter !== filter) {
      this.props.changeFilter(filter);
    }
  };

  render() {
    return (
      <section className="todo-app">
        <div>
          <header className="header">
            <h1>todos</h1>
            <TodoInput
                value={this.props.todoInputValue}
                onChange={this.handleTodoInputOnChange}
                onPressEnter={this.handleTodoInputPressEnter}
            />
          </header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" onClick={this.handleToggleStateOfAllTodos}/>
            <label htmlFor="toggle-all" />
            <ul className="todo-list">
              {
                  this.props.todos.map(todo => <Todo
                      id={todo._id}
                      key={todo._id}
                      state={todo.state}
                      description={todo.description}
                      onStateChange={e => this.handleTogglingTodoState(todo._id, e)}
                      onDelete={() => this.handleDeleteTodo(todo._id)}
                  />)
              }
            </ul>
          </section>
          <footer className="footer">
            <TodoCount value={this.props.todos.filter(todo => todo.state === 'ACTIVE').length}/>
            <ul className="filters">
              <li>
                <a href="/" className={this.props.filter === "ALL" ? "selected" : undefined} onClick={e => this.handleCategoryButtonClick("ALL", e)}>
                  All
                </a>
              </li>
              <span> </span>
              <li>
                <a href="/" className={this.props.filter === "ACTIVE" ? "selected" : undefined} onClick={e => this.handleCategoryButtonClick("ACTIVE", e)}>
                  Active
                </a>
              </li>
              <span> </span>
              <li>
                <a href="/" className={this.props.filter === "COMPLETED" ? "selected" : undefined} onClick={e => this.handleCategoryButtonClick("COMPLETED", e)}>
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed" onClick={this.handleDeleteCompletedTodos}>Clear completed</button>
          </footer>
        </div>
      </section>
    );
  }
}

const Actions = {
  getAllTodos,
  setTodoInputValue,
  addTodo,
  updateTodoState,
  deleteTodo,
  deleteCompletedTodos,
  updateAllTodosState,
  setInitialFilter,
  changeFilter,
};

const mapStateToProps = state => {
  return {
    todos: getFilteredTodos(state),
    todoInputValue: state.todos.todoInputValue,
    filter: state.todos.filter,
  };
};

export default connect(
    mapStateToProps,
    Actions
)(HomePage);
