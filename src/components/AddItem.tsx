import { useState, type FormEvent } from "react";

type AddItemProps = {
  handleAdd: (item: string) => void;
};

const AddItem = ({ handleAdd }: AddItemProps) => {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newItem.length > 0) {
      handleAdd(newItem);
    }
    setNewItem("");
  }

  function handlePressKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newItem.trim()) {
        handleAdd(newItem);
        setNewItem("");
      }
    }
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
        onKeyDown={() => handlePressKey}
      />
      <button className="add-button" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddItem;
