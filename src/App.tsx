import React, { useReducer, useState } from "react";
import logo from "./logo.svg";
import moonIcon from "./images/icon-moon.svg";
import checkIcon from "./images/icon-check.svg";
import crossIcon from "./images/icon-cross.svg";
import "./App.css";

type TODOACTIONTYPE =
  | { type: "add"; payload: { id: number; text: string; completed: false } }
  | { type: "delete"; payload: { id: number } }
  | { type: "toggle"; payload: { id: number } };

type Todo = { id: number; text: string; completed: boolean };

type TodosStateType = Todo[];

const initialTodosState: TodosStateType = [];

const todosReducer = (
  state: typeof initialTodosState,
  { type, payload }: TODOACTIONTYPE
): TodosStateType => {
  switch (type) {
    case "add":
      return [...state, payload];

    case "delete":
      return state.filter((todo) => todo.id !== payload.id);

    case "toggle":
      return state.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: !todo.completed };
        return todo;
      });

    default:
      console.warn("Unknown action type");
      return state;
  }
};

type TodoItemProps = {
  todo: Todo;
  todosDispatch: React.Dispatch<TODOACTIONTYPE>;
};

const TodoItem = ({ todo, todosDispatch }: TodoItemProps) => {
  const handleDeleteTodo = () => {
    todosDispatch({ type: "delete", payload: { id: todo.id } });
  };

  const handleToggleTodo = () => {
    todosDispatch({ type: "toggle", payload: { id: todo.id } });
  };

  return (
    <li className="todos-container__todo-item">
      <span
        className={`todos-container__checkbox${
          todo.completed ? " todos-container__checkbox--complete" : ""
        }`}
        aria-label="toggle todo completion button"
        onClick={handleToggleTodo}
      >
        <img src={checkIcon} alt="check mark" />
      </span>
      <p>{todo.text}</p>
      <img
        src={crossIcon}
        alt="delete todo button"
        data-todo-id={todo.id}
        onClick={handleDeleteTodo}
      />
    </li>
  );
};

type TodosUnorderedListProps = {
  todosState: TodosStateType;
  todosDispatch: React.Dispatch<TODOACTIONTYPE>;
};

const TodosUndorderedList = ({
  todosState,
  todosDispatch,
}: TodosUnorderedListProps) => {
  return (
    <ul className="todos-container__todo-list">
      {todosState.map((todo) => (
        <TodoItem key={todo.id} todo={todo} todosDispatch={todosDispatch} />
      ))}
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
  );
};

type TodosInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  todosDispatch: React.Dispatch<TODOACTIONTYPE>;
};

const TodosInput = ({ text, setText, todosDispatch }: TodosInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    todosDispatch({
      type: "add",
      payload: { id: Date.now(), text, completed: false },
    });
    setText("");
  };

  return (
    <div className="todos-container__todo-input-container">
      <span className="todos-container__checkbox">
        <img src={checkIcon} alt="check icon" />
      </span>
      <form onSubmit={handleOnSubmit}>
        <input
          className="todos-container__todo-input"
          value={text}
          onChange={handleOnChange}
          type="text"
          name=""
          id=""
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  );
};

type TodosProps = {};

const Todos = (props: TodosProps) => {
  const [text, setText] = useState("");
  const [todosState, todosDispatch] = useReducer(
    todosReducer,
    initialTodosState
  );

  console.log(todosState);

  return (
    <>
      <TodosInput text={text} setText={setText} todosDispatch={todosDispatch} />
      <TodosUndorderedList
        todosState={todosState}
        todosDispatch={todosDispatch}
      />
    </>
  );
};

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
        <Todos />
        {/* <div className="todos-container__todo-input-container">
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
        </div> */}
        {/* <ul className="todos-container__todo-list">
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
        </ul> */}
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
