import React from "react";
import logo from "./logo.svg";
import moonIcon from "./images/icon-moon.svg";
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
          <li className="padding-1em">test 1</li>
          <li className="padding-1em">test 2</li>
          <li className="padding-1em">test 3</li>
          <li className="padding-1em">test 4</li>
          <li className="flex-row justify-space-between padding-1em">
            <p>5 items left</p>
            <button>Clear Completed</button>
          </li>
        </ul>
        <div className="flex-row justify-content-center padding-1em">
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <p className="center-text">Drag and drop to reorder list</p>
      </div>
    </main>
  );
}

export default App;
