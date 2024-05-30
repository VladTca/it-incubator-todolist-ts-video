import React, { useState } from "react";
import { Button } from "./Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: "all" | "active" | "completed") => void;
  addTask: (title: string) => void;
  // tasks:TaskType[]; -------equal
};

export function Todolist({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}: PropsType) {
  const taskLists =
    tasks.length === 0 ? (
      <span> Your tasklist is empty</span>
    ) : (
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button title={"x"} onClickhandler={() => removeTask(task.id)} />
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
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addNewTask = () => {
    addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <Button title={"+"} onClickhandler={addNewTask} />
      </div>
      {taskLists}
      <div>
        <Button onClickhandler={() => changeFilter("all")} title={"All"} />
        <Button
          onClickhandler={() => changeFilter("active")}
          title={"Active"}
        />
        <Button
          onClickhandler={() => changeFilter("completed")}
          title={"Completed"}
        />
      </div>
    </div>
  );
}
