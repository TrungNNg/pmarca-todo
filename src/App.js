import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import _ from 'lodash';

function App() {
  const [todo, setTodo] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setTasks(tasks.concat({id: uuidv4(), title: todo}))
    setTodo('')
    console.log("summited");
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleRemove = (id) => {
    var filtered = tasks.filter(function(value){ 
      return value.id != id ;
    });
    setTasks(filtered);
  }

  const handleMove = (id) => {

  }

  return (
    <div className="main-container">

      <div className="task-container">
      <p className="main-container__p">Todo</p>
      <div className="task-container__items">
      {(tasks || []).map((item) => {
          return <div key={item.id}>
            <button onClick={() => handleMove(item.id)}>Move</button>
            {item.title} 
            <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
        })}
      </div>

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={todo}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

    </div>
  );
}

export default App;
