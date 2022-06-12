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
        <div className="todos-container__input-container">
          <span>
            <img src={checkIcon} alt="moon icon" />
          </span>
          <input type="text" name="" id="" placeholder="Create a new todo..." />
        </div>
        <ul className="todos-container__todo-list">
          <li>
            <span>
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li>
            <span>
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li>
            <span>
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li>
            <span>
              <img src={checkIcon} alt="moon icon" />
            </span>
            <p>test 1</p>
            <img src={crossIcon} alt="moon icon" />
          </li>
          <li>
            <p>5 items left</p>
            <button>Clear Completed</button>
          </li>
        </ul>
        <div className="todos-container__todo-filter">
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
