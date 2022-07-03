import React from 'react'

const TodoInput = ({handlePostRequest,newTodo,setNewTodo}) => {
  return (
    <div>
    <input
      type="text"
      value={newTodo}
      onChange={({ target }) => {
        setNewTodo(target.value);
      }}
    />
    <button onClick={handlePostRequest}>+</button>
  </div>
  )
}

export default TodoInput