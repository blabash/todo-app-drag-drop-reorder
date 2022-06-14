import React from "react";
import logo from "./logo.svg";
import moonIcon from "./images/icon-moon.svg";
import checkIcon from "./images/icon-check.svg";
import crossIcon from "./images/icon-cross.svg";
import "./App.css";

function App() {
  return (
    <main className="todos-app">
      <div className="todos-container">
        <div className="todos-container__header">
          <h1>TODO</h1>
          <button>
            <img src={moonIcon} alt="moon icon" />
          </button>
        </div>
        <div className="todos-container__todo-input-container">
          <span className="todos-container__checkbox">
            <img src={checkIcon} alt="check icon" />
          </span>
          <input
            className="todos-container__todo-input"
            type="text"
            name=""
            id=""
            placeholder="Create a new todo..."
          />
        </div>
        <ul className="todos-container__todo-list">
          <li className="todos-container__todo-item">
            <span className="todos-container__checkbox todos-container__checkbox--complete">
              <img src={checkIcon} alt="check icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="cross icon" />
          </li>
          <li className="todos-container__todo-item">
            <span className="todos-container__checkbox todos-container__checkbox--complete">
              <img src={checkIcon} alt="check icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="cross icon" />
          </li>
          <li className="todos-container__todo-item">
            <span className="todos-container__checkbox todos-container__checkbox--complete">
              <img src={checkIcon} alt="check icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="cross icon" />
          </li>
          <li className="todos-container__todo-item">
            <span className="todos-container__checkbox todos-container__checkbox--complete">
              <img src={checkIcon} alt="check icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="cross icon" />
          </li>
          <li className="todos-container__status-tray">
            <p>5 items left</p>
            <div className="todos-container__filters todos-container__filters--desktop">
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
            <button>Clear Completed</button>
          </li>
        </ul>
        <div className="todos-container__filters todos-container__filters--mobile">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <p className="todos-container__description">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}

export default App;
