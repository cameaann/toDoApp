import { useEffect, useState, type FormEvent } from "react";

type AddItemProps = {
  handleAdd: (item: string) => void;
};

const AddItem = ({ handleAdd }: AddItemProps) => {
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const inp = document.getElementById("task");

    inp?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (newItem.length > 0) {
          handleAdd(newItem);
          setNewItem("");
        }
      }
    });
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newItem.length > 0) {
      handleAdd(newItem);
    }
    setNewItem("");
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <input
        className="task-input"
        id="task"
        type="text"
        placeholder="Add a new task"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className="add-button" type="submit">Add</button>
    </form>
  );
};

export default AddItem;
