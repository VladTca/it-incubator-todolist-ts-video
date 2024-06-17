import React, { useRef, useState } from "react";
import { Button } from "./Button";
import "./App.css";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (
    filter: "all" | "active" | "completed",
    todolistId: string,
  ) => void;
  addTask: (title: string) => void;
  filter: "all" | "active" | "completed";
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
}: PropsType) {
  const taskLists =
    tasks.length === 0 ? (
      <span> Your tasklist is empty</span>
    ) : (
      <ul>
        {tasks.map((task) => {
          const removeHandler = () => removeTask(task.id);
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
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
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const [error, setError] = useState<string | null>(null);
  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(newTaskTitle);
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

  return (
    <div className={"todolist"}>
      <h3>{title}</h3>
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
