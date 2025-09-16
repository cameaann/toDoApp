import { useState } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";
import items_db from "./items_db.json";

function App() {
  const toDo = localStorage.getItem('toDoList')
  const [toDoList] = useState(toDo ? JSON.parse(toDo) : items_db);

  return (
    <>
      <h3 className="title">TODO LIST</h3>
      <ToDoList toDoItems={toDoList} />
    </>
  );
}

export default App;
