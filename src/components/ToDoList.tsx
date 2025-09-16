import { useEffect, useState } from "react";
import Item from "./Item";
import AddItem from "./AddItem";
import type { ToDoItem } from "./types";

type ToDoListProps = {
  toDoItems: ToDoItem[];
};

const ToDoList = ({ toDoItems }: ToDoListProps) => {
  const [toDoList, setToDoList] = useState<ToDoItem[]>(toDoItems);
  const pendingTasks = toDoList.filter((item) => item.status === "pending");
  const doneList = toDoList.filter((item) => item.status === "completed");

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  const handleAddItem = (item: string) => {
    const addItem = { id: toDoList.length + 1, text: item, status: "pending" };
    setToDoList([...toDoList, addItem]);
  };

  const handleChange = (id: number) => {
    const updateList = toDoList.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          status: el.status === "pending" ? "completed" : "pending",
        };
      }
      return el;
    });
    setToDoList(updateList);
  };

  const handleDelete = (id: number) =>{
    const updatedList = toDoList.filter(item => item.id !== id)
    setToDoList(updatedList)
  }

  return (
    <div className="toDoList">
      <AddItem handleAdd={handleAddItem} />
      <ul>
        {pendingTasks.map((item) => (
          <Item item={item} key={item.id} onChange={handleChange} onClick={handleDelete}/>
        ))}
      </ul>
      {doneList.length > 0 ? (
        <>
          <div className="line"></div>
          <ul>
            {doneList.map((item) => (
              <Item item={item} key={item.id} onChange={handleChange} onClick={handleDelete}/>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default ToDoList;
