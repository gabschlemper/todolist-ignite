import styles from "./TodoItem.module.css";
import TrashIcon from "../assets/trash-icon.svg";

interface TodoItemProps {
  text: string;
  completed: boolean;
  onCheckboxChange: any;
  onDeleteItem: any;
}

export function TodoItem({
  text,
  completed,
  onCheckboxChange,
  onDeleteItem,
}: TodoItemProps) {
  return (
    <div
      className={`${styles.WrapperTasks} ${completed ? styles.completed : ""}`}
    >
      <input type="checkbox" checked={completed} onChange={onCheckboxChange} />
      <p className={styles.task}>{text}</p>
      <button onClick={onDeleteItem} className={styles.trash}>
        <img src={TrashIcon} />
      </button>
    </div>
  );
}
