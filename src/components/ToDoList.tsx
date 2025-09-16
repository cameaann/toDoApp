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
    const addItem: ToDoItem = { id: Date.now(), text: item, status: "pending" };
    setToDoList([...toDoList, addItem]);
  };

  const toggleStatus = (status: ToDoItem["status"]) : ToDoItem["status"] =>
    status === "pending" ? "completed" : "pending"

  const handleChange = (id: number | string) => {
    const updateList = toDoList.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          status: toggleStatus(el.status),
        };
      }
      return el;
    });
    setToDoList(updateList)
  };

  const handleDelete = (id: string | number) => {
    const updatedList = toDoList.filter((item) => item.id !== id);
    setToDoList(updatedList);
  };

  return (
    <div className="toDoList">
      <AddItem handleAdd={handleAddItem} />
      <ul>
        {pendingTasks.map((item) => (
          <Item
            item={item}
            key={item.id}
            onChange={handleChange}
            onClick={handleDelete}
          />
        ))}
      </ul>
      {doneList.length > 0 ? (
        <>
          <div className="line"></div>
          <ul>
            {doneList.map((item) => (
              <Item
                item={item}
                key={item.id}
                onChange={handleChange}
                onClick={handleDelete}
              />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default ToDoList;
