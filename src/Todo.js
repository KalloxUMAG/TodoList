import "./styles.css";
import React, { useEffect, useState } from "react";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resp = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=20"
    );
    const json = await resp.json();
    setTodos(json);
    setShowTodos(json);
  };

  const handleButton = () => {
    setShowFilter(!showFilter);
    if (showFilter === true) {
      const newArray = todos.filter((todo) => todo.completed === true);
      setShowTodos(newArray);
      return;
    }
    setShowTodos(todos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleButton}>
        {showFilter ? "Mostrar solo completados" : "Mostrar todos"}
      </button>
      <ol>
        {showTodos.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ol>
    </div>
  );
};
