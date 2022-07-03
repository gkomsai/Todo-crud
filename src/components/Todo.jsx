import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toogle, setToogle] = useState(false);

  const getTodos = async (p = 1, l = 5) => {
    try {
      setIsLoading(true);
      let res = await axios.get(`/todos?_page=${p}&_limit=${l}`);

      setTodos(res.data);
      setIsLoading(false);
      let lastPage = Math.ceil(Number(res.headers["x-total-count"] / limit));
      setLastPage(lastPage);
    } catch (err) {
      console.log(err);
    }
  };
  const saveInfo = () => {
    // we are writing the post method to send the information in our backened.

    axios
      .post("/todos", {
        text: newTodo,
        isCompleted: false,
      })
      .then((data) => {
        console.log(data);
        setTodos([...todos, data]); //agar yaha setTodos nahi likhe to hamara data to backened me save ho jayega par use fronted me dikhane ke liye page ko refreh karna padega isse bachne ke liye hi hamene setTodos me us data ko set kar diya jisse hamara component phir se rerender hoga aur hame fronted me data dikhane lagega.

        setNewTodo("");
      });
  };
  const handleToogle = async (id) => {
    const res = await axios.patch(`/todos/${id}`, { isCompleted: !toogle });
    console.log(res.data);
    // setTodos([...todos,res.data]);
    // res.data.headers['Content-Type'];
  };

  useEffect(() => {
    getTodos(page, limit); // remember to pass the page and limit here as an argument then it will work only
  }, [page, limit]);

  return (
    <div>
      <h1>Todos</h1>
      {isLoading && <div id="loading-container"></div>}
      {/*  if our fist condition is true then it will execute the second condition */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "40%",
          margin: "auto",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          PREV
        </button>
        <button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
          NEXT
        </button>
        <select name="" id="" onChange={(e) => setLimit(e.target.value)}>
          <option value="5">5/page</option>
          <option value="10">10/page</option>
          <option value="20">20/page</option>
          <option value="30">30/page</option>
          <option value="40">40/page</option>
          <option value="50">50/page</option>
        </select>
      </div>
      <TodoInput
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handlePostRequest={saveInfo}
      />
      <TodoList todos={todos} handleToogle={handleToogle} />
    </div>
  );
};

export default Todo;
