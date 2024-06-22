import React, { useState } from "react";
import { Button } from "./Button";
import "./App.css";

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

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      if (newTaskTitle.trim() === "") {
        return;
      }

      addTask(newTaskTitle, id);
      setNewTaskTitle("");
    }
  };

  const [error, setError] = useState<string | null>(null);
  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(newTaskTitle, id);
    } else {
      setError("Title is required");
    }
    setNewTaskTitle("");
  };
  // const addTaskHandler = () => {
  //   if (taskInputRef.current) {
  //     addTask(taskInputRef.current.value);
  //     taskInputRef.current.value = "";
  //   }
  // };

  // const taskInputRef = useRef<HTMLInputElement>(null);

  const removeTodoList = (id: string) => {
    removeTodolist(id);
  };

  return (
    <div className={"todolist"}>
      <h3>
        {title}
        <button onClick={() => removeTodoList(id)}>x</button>
      </h3>
      <div>
        <input
          // ref={taskInputRef}
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
          // minLength={3}
          // maxLength={5}
        />
        <Button
          title={"+"}
          onClickhandler={addTaskHandler}
          disabled={newTaskTitle === "" || newTaskTitle.length > 20}
        />
        {newTaskTitle.length > 10 && <div>recomend less than 10</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
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
