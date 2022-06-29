import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import moonIcon from "./images/icon-moon.svg";
import sunIcon from "./images/icon-sun.svg";
import checkIcon from "./images/icon-check.svg";
import crossIcon from "./images/icon-cross.svg";
import "./App.css";

type TODOACTIONTYPE =
  | { type: "add"; payload: { id: number; text: string; completed: false } }
  | { type: "delete"; payload: { id: number } }
  | { type: "toggle"; payload: { id: number } }
  | { type: "clear-completed"; payload?: null };

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

    case "clear-completed":
      return state.filter((todo) => !todo.completed);

    default:
      console.warn("Unknown action type");
      return state;
  }
};

type TodosDescriptionProps = {};

const TodosDescription = (props: TodosDescriptionProps) => {
  return (
    <p className="todos-container__description">
      Drag and drop to reorder list
    </p>
  );
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
        role="button"
      >
        {todo.completed && <img src={checkIcon} alt="check mark" />}
      </span>
      <p>{todo.text}</p>
      <img
        className="todos-container__delete-btn"
        role="button"
        src={crossIcon}
        alt="delete todo button"
        data-todo-id={todo.id}
        onClick={handleDeleteTodo}
      />
    </li>
  );
};

const filtersArr = ["all", "active", "completed"] as const;

type TodosFilters = typeof filtersArr[number];

type TodosUnorderedListProps = {
  filteredTodos: TodosStateType;
  todosDispatch: React.Dispatch<TODOACTIONTYPE>;
  filter: TodosFilters;
  setFilter: React.Dispatch<React.SetStateAction<TodosFilters>>;
  todosCount: number;
};

const TodosUndorderedList = ({
  filteredTodos,
  todosDispatch,
  filter,
  setFilter,
  todosCount,
}: TodosUnorderedListProps) => {
  const filterBtns = filtersArr.map((filterType) => (
    <button
      style={{
        color: filterType === filter ? "var(--bright-blue)" : undefined,
      }}
      onClick={() => setFilter(filterType)}
    >
      {filterType[0].toUpperCase() + filterType.slice(1)}
    </button>
  ));

  return (
    <>
      <ul className="todos-container__todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} todosDispatch={todosDispatch} />
        ))}
        <li className="todos-container__status-tray">
          <p>{todosCount} items left</p>
          <div className="todos-container__filters todos-container__filters--desktop">
            {filterBtns}
          </div>
          <button onClick={() => todosDispatch({ type: "clear-completed" })}>
            Clear Completed
          </button>
        </li>
      </ul>
      <div className="todos-container__filters todos-container__filters--mobile">
        {filterBtns}
      </div>
    </>
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
      <span className="todos-container__checkbox"></span>
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

type TodosHeaderProps = {};

const TodosHeader = (props: TodosHeaderProps) => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div className="todos-container__header">
      <h1>TODO</h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <img src={moonIcon} alt="moon icon" />
        ) : (
          <img src={sunIcon} alt="sun icon" />
        )}
      </button>
    </div>
  );
};

type TodosContainerProps = {
  children?: React.ReactNode;
};

const TodosContainer = ({ children }: TodosContainerProps) => {
  return (
    <>
      <div className="bg-top"></div>
      <div className="bg-bottom"></div>
      <div className="todos-container">{children}</div>
    </>
  );
};

type ThemeType = "light" | "dark";

type ThemeContextInterface = {
  toggleTheme: () => void;
  theme: ThemeType;
};

const ThemeContext = createContext({} as ThemeContextInterface);

function App() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<TodosFilters>("all");
  const [todosState, todosDispatch] = useReducer(
    todosReducer,
    initialTodosState
  );
  const [theme, setTheme] = useState<ThemeType>("light");

  /* change opacity for the dragged item. 
  remember the source item for the drop later */
  // const handleDragStart = (event) => {
  //   event.target.style.opacity = 0.5;
  //   sourceElement = event.target;
  //   event.dataTransfer.effectAllowed = "move";
  // };

  /* do not trigger default event of item while passing (e.g. a link) */
  // const handleDragOver = (event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // };

  const themeValue = useMemo(
    () => ({
      toggleTheme: () => {
        setTheme((t) => (t === "light" ? "dark" : "light"));
      },
      theme,
    }),
    [theme]
  );

  useLayoutEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const filteredTodos = useMemo(() => {
    let filterFn;
    switch (filter) {
      case "all":
        filterFn = () => true;
        break;
      case "active":
        filterFn = () => true;
        break;
      case "completed":
        filterFn = (todo: Todo) => todo.completed;
        break;

      default:
        console.warn("That filter does not exist");
        filterFn = () => true;
        break;
    }

    return todosState.filter(filterFn);
  }, [filter, todosState]);

  return (
    <main className="todos-app">
      <TodosContainer>
        <ThemeContext.Provider value={themeValue}>
          <TodosHeader />
        </ThemeContext.Provider>
        <TodosInput
          text={text}
          setText={setText}
          todosDispatch={todosDispatch}
        />
        <TodosUndorderedList
          filteredTodos={filteredTodos}
          todosDispatch={todosDispatch}
          setFilter={setFilter}
          todosCount={todosState.length}
          filter={filter}
        />
        <TodosDescription />
      </TodosContainer>
    </main>
  );
}

export default App;
