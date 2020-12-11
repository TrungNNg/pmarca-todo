import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import {
  TodoContainer,
  TodoForm,
  TodoList,
  TodoTitle,
} from "./components/Todo";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [watch, setWatch] = useState("");
  const [watchs, setWatchs] = useState([]);

  //handle todo
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    switch (event.target.name) {
      case "todo":
        setTodos(todos.concat({ id: uuidv4(), type: "todo", title: todo }));
        setTodo("");
        console.log("summited todo");
        break;
      case "watch":
        setWatchs(watchs.concat({ id: uuidv4(), type: "watch", title: watch }));
        setWatch("");
        console.log("submited watch");
        break;
      default:
        console.log("reach switch default");
    }
  };

  const handleChange = (event) => {
    console.log(event.target.name);
    switch (event.target.name) {
      case "todo":
        setTodo(event.target.value);
        break;
      case "watch":
        setWatch(event.target.value);
        break;
      default:
        console.log("reach switch default");
    }
  };

  //give object a type="" to handle 3 cases
  const handleRemove = (id, type) => {
    if (type === "todo") {
      let filtered = todos.filter(function (value) {
        return value.id != id;
      });
      setTodos(filtered);
    } else if (type === "watch") {
      let filtered = watchs.filter(function (value) {
        return value.id != id;
      });
      setWatchs(filtered);
    } else {
      return null;
    }
  };

  // use type to know which list this task belong to
  // Later and Watch will move to todo => index
  // index => anti todo or todo same logic
  // remove from current list the add to new list change the type
  // pass in the map method.
  const handleMove = (id) => {};

  //handle later task

  return (
    <div className="main-container">
      <TodoContainer>
        <TodoTitle title="Todo List" />
        <TodoList
          tasks={todos}
          handleMove={handleMove}
          handleRemove={handleRemove}
        />
        <TodoForm
          task={todo}
          type="todo"
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </TodoContainer>

      <TodoContainer>
        <TodoTitle title="Watch List" />
        <TodoList
          tasks={watchs}
          handleMove={handleMove}
          handleRemove={handleRemove}
        />
        <TodoForm
          task={watch}
          type="watch"
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </TodoContainer>
    </div>
  );
}

export default App;
