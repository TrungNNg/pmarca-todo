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

  const [later, setLater] = useState("");
  const [laters, setLaters] = useState([]);

  const [index, setIndex] = useState([]);
  const [done, setDone] = useState([]);

  //handle todo
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    switch (event.target.name) {
      case "todo":
        setTodos(todos.concat({ id: uuidv4(), type: "todo", title: todo }));
        setTodo("");
        break;
      case "watch":
        setWatchs(watchs.concat({ id: uuidv4(), type: "watch", title: watch }));
        setWatch("");
        break;
      case "later":
        setLaters(laters.concat({ id: uuidv4(), type: "later", title: later }));
        setLater("");
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
      case "later":
        setLater(event.target.value);
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
    } else if (type === "later") {
      let filtered = laters.filter(function (value) {
        return value.id != id;
      });
      setLaters(filtered);
    } else if (type === "index") {
      let filtered = index.filter(function (value) {
        return value.id != id;
      });
      setIndex(filtered);
    }
  };

  // use type to know which list this task belong to
  // Later and Watch will move to todo => index
  // index => anti todo or todo same logic
  // remove from current list the add to new list change the type
  // pass in the map method.
  const handleMove = (item, event) => {
    if (item.type === "watch" || item.type === "later") {
      handleRemove(item.id, item.type);
      item.type = "todo";
      setTodos(todos.concat(item));
      console.log("move to todo from watch");
    } else if (item.type === "todo") {
      handleRemove(item.id, item.type);
      item.type = "index";
      setIndex(index.concat(item));
      console.log("move to index from todo");
    } else if (item.type === "index") {
      if (event.target.name === "back") {
        handleRemove(item.id, item.type);
        item.type = "todo";
        setTodos(todos.concat(item));
        console.log("move to todo from index");
      } else {
        handleRemove(item.id, item.type);
        item.type = "done";
        setDone(done.concat(item));
        console.log("move to done from index");
      }
    } else {
      return null;
    }
  };

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

      <TodoContainer>
        <TodoTitle title="Later List" />
        <TodoList
          tasks={laters}
          handleMove={handleMove}
          handleRemove={handleRemove}
        />
        <TodoForm
          task={later}
          type="later"
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </TodoContainer>

      <TodoContainer>
        <TodoTitle title="Index Card" />
        <IndexCard tasks={index} handleMove={handleMove} />
      </TodoContainer>

      <TodoContainer>
        <TodoTitle title="Anti Todo" />
        <AntiTodo tasks={done} />
      </TodoContainer>
    </div>
  );
}

const IndexCard = ({ tasks, handleMove }) => {
  return (
    <div className="task-container__items">
      {(tasks || []).map((item) => {
        return (
          <div key={item.id}>
            <button name="back" onClick={(e) => handleMove(item, e)}>
              Back
            </button>
            {item.title}
            <button name="done" onClick={(e) => handleMove(item, e)}>
              Done
            </button>
          </div>
        );
      })}
    </div>
  );
};

const AntiTodo = ({ tasks }) => {
  return(
    <div className="task-container__items">
    {(tasks || []).map((item) => {
      return <div key={item.id}>{item.title}</div>;
    })}
    <button>Add to Database</button>
  </div>
  )
};

export default App;
