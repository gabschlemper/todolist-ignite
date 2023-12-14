import { ChangeEvent, useEffect, useState } from "react";
import PlusIcon from "../assets/plus-icon.svg";

import styles from "./todoList.module.css";
import { TodoItem } from "./TodoItem";

interface TodoTypes {
  id: number;
  text: string;
  completed: boolean;
  trash: boolean;
}

const todoInicial: TodoTypes[] = [
  {
    id: 1,
    text: "Clean my House",
    completed: false,
    trash: false,
  },
  {
    id: 2,
    text: "Wash my Hair",
    completed: false,
    trash: false,
  },
];

export function TodoList() {
  const [todos, setTodos] = useState(todoInicial);
  const [nextTask, setNextTask] = useState("");
  const [nextId, setNextId] = useState(4);

  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  function HandleChange(event: ChangeEvent<HTMLInputElement>) {
    setNextTask(event.target.value);
  }

  function HandleClick(e: any) {
    setNextTask(e.target.value);
    const newTask = {
      id: nextId,
      text: nextTask,
      completed: false,
      trash: false,
    };
    setTodos([...todos, newTask]);
    setNextId(nextId + 1);
    setNextTask("");
  }

  function handleDeleteItem(id: number) {
    const index = todos.findIndex((item) => item.id === id);
    const newTodo = [...todos];

    newTodo[index] = {
      ...newTodo[index],
      trash: true,
    };
    setTodos(newTodo);
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const createdTasks = todos.filter((todo) => !todo.trash).length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.newTask}>
        <input
          className={styles.input}
          type="text"
          value={nextTask}
          placeholder="Adicione aqui uma nova tarefa"
          onChange={HandleChange}
        />
        <button className={styles.button} onClick={HandleClick}>
          Criar
          <img src={PlusIcon} />
        </button>
      </div>

      <div className={styles.infoTasks}>
        <div className={styles.info}>
          <span className={styles.createdTasks}>Tarefas criadas</span>
          <span className={styles.counter}>{createdTasks}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.completedTasks}>Concluidas</span>
          <span className={styles.counter}>{completedCount}</span>
        </div>
      </div>
      {todos
        .filter((item) => item.trash === false)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onCheckboxChange={() => handleCheckboxChange(todo.id)}
            onDeleteItem={() => handleDeleteItem(todo.id)}
          />
        ))}
    </div>
  );
}
