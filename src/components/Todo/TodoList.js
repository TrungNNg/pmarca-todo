import React from 'react'

const TodoList = ({ tasks, handleMove, handleRemove }) => {
    return (
      <div className="task-container__items">
        {(tasks || []).map((item) => {
          return (
            <div key={item.id}>
              <button onClick={() => handleMove(item)}>Move</button>
              {item.title}
              <button onClick={() => handleRemove(item.id, item.type)}>Remove</button>
            </div>
          );
        })}
      </div>
    );
};

export default TodoList;