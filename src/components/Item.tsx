import { type ToDoItem } from "./types";

export type ItemProp = {
  item: ToDoItem;
  onChange: (id: number) => void;
  onClick: (id: number) => void;
};

const Item = ({ item, onChange, onClick }: ItemProp) => {
  return (
    <li className="item" key={item.id}>
      <div className="task-box">
        <input
          type="checkbox"
          onChange={() => onChange(item.id)}
          checked={item.status === "completed"}
        />
        <span className="task">{item.text}</span>
      </div>

      <button className="btn" onClick={() => onClick(item.id)}>X</button>
    </li>
  );
};

export default Item;
