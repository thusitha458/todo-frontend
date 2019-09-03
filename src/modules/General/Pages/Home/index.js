import React, { PureComponent } from "react";

class HomePage extends PureComponent {
  render() {
    return (
      <section className="todo-app">
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value=""
            />
          </header>
          <section className="main">
            <input id="toggle-all" className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all"></label>
            <ul className="todo-list">
              <li className="completed">
                <div className="view">
                  <input className="toggle" type="checkbox" checked={true} />
                  <label>adad</label>
                  <button className="destroy"></button>
                </div>
                <input className="edit" value="adad" />
              </li>
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>3</strong>
              <span> </span>
              <span>items</span>
              <span> left</span>
            </span>
            <ul className="filters">
              <li>
                <a href="#/" className="selected">
                  All
                </a>
              </li>
              <span> </span>
              <li>
                <a href="#/active" className="">
                  Active
                </a>
              </li>
              <span> </span>
              <li>
                <a href="#/completed" className="">
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        </div>
      </section>
    );
  }
}

export default HomePage;
