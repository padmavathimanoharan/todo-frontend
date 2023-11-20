import React from "react";
import { useState } from "react";
import AddTodo from "./pages/AddTodo";
import TodoList from "./pages/TodoList";

const App = () => {
  const [todo, setTodo] = useState();

  return (
    <>
      <AddTodo />
      <TodoList />
    </>
  );
};

export default App;
