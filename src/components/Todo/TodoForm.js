import React from 'react'

const TodoForm = (props) => {
    return (
      <form name={props.type} onSubmit={props.onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name={props.type}
            value={props.task}
            onChange={props.onChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
};

export default TodoForm;