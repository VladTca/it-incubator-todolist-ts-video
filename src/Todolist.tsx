import React from "react";
import { Button } from "./Button";
import "./App.css";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
// /-----------------------------------------------
type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (
    filter: "all" | "active" | "completed",
    todolistId: string,
  ) => void;
  addTask: (title: string, todolistId: string) => void;
  filter: "all" | "active" | "completed";
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  // tasks:TaskType[]; -------equal
};

export function Todolist({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  filter,
  id,
  changeStatus,
  removeTodolist,
}: PropsType) {
  const taskLists =
    tasks.length === 0 ? (
      <span> Your tasklist is empty</span>
    ) : (
      <ul>
        {tasks.map((task) => {
          const changeTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeStatus(task.id, e.currentTarget.checked, id);
          };
          const removeHandler = () => removeTask(task.id, id);
          return (
            <li className={task.isDone ? "task-done" : "task"} key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatus}
              />
              <span>{task.title}</span>
              <Button title={"x"} onClickhandler={removeHandler} />
            </li>
          );
        })}
      </ul>
    );

  const removeTodoList = (id: string) => {
    removeTodolist(id);
  };

  return (
    <div className={"todolist"}>
      <h3>
        {title}
        <button onClick={() => removeTodoList(id)}>x</button>
      </h3>
      <AddItemForm addTask={addTask} id={id} />
      {taskLists}
      <div>
        <Button
          classes={filter === "all" ? "btn-folder-active" : ""}
          onClickhandler={() => changeFilter("all", id)}
          title={"All"}
        />
        <Button
          classes={filter === "active" ? "btn-folder-active" : ""}
          onClickhandler={() => changeFilter("active", id)}
          title={"Active"}
        />
        <Button
          classes={filter === "completed" ? "btn-folder-active" : ""}
          onClickhandler={() => changeFilter("completed", id)}
          title={"Completed"}
        />
      </div>
    </div>
  );
}
