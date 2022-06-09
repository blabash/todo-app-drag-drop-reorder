import React from "react";
import logo from "./logo.svg";
import moonIcon from "./images/icon-moon.svg";
import checkIcon from "./images/icon-check.svg";
import crossIcon from "./images/icon-cross.svg";
import "./App.css";

function App() {
  return (
    <main className="todos-app">
      <div className="todos-container flex-col gap-1em">
        <div className="flex-row align-items-center justify-space-between">
          <h1>TODO</h1>
          <button>
            <img src={moonIcon} alt="moon icon" />
          </button>
        </div>
        <input
          className="padding-1em"
          type="text"
          name=""
          id=""
          placeholder="Create a new todo..."
        />
        <ul>
          <li className="todo-item padding-1em">
            <span className="check-icon-bg flex-row justify-content-center">
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li className="todo-item padding-1em">
            <span className="check-icon-bg flex-row justify-content-center">
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li className="todo-item padding-1em">
            <span className="check-icon-bg flex-row justify-content-center">
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li className="todo-item padding-1em">
            <span className="check-icon-bg flex-row justify-content-center">
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li className="flex-row justify-space-between padding-1em dark-grayish-blue">
            <p>5 items left</p>
            <button>Clear Completed</button>
          </li>
        </ul>
        <div className="flex-row justify-content-center padding-1em font-weight-bold">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <p className="center-text dark-grayish-blue margin-top-1em">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}

export default App;
