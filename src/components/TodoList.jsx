import React from "react";

const TodoList = ({ todos,handleToogle }) => {
 
  return (
    <div>
      {" "}
      {todos.map((el) => (
        <div
          key={el.id}
          style={{
            display: "flex",
            gap: "20px",
            width: "40%",
            margin: "auto",
            justifyContent: "flex-start",
          }}
        >
          <h4>{el.id}</h4>
          <h4>{el.text}</h4>
          {/* <button onClick={()=>handleToogle(el.id)}>Toogle</button> */}
          
          
        </div>
      ))}
    </div>
  );
};

export default TodoList;
