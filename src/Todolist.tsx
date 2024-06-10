import React, { useRef, useState } from "react";
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
  // changeFilter: (filter: "all" | "active" | "completed") => void;
  addTask: (title: string) => void;
  // tasks:TaskType[]; -------equal
};

export function Todolist({
  title,
  tasks,
  removeTask,
  // changeFilter,
  addTask,
}: PropsType) {
  type filterType = "all" | "active" | "completed";

  const [filter, setFilter] = useState<filterType>("all");
  let filteredTasks = tasks;
  switch (filter) {
    case "active":
      filteredTasks = tasks.filter((task) => !task.isDone);
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.isDone);
      break;
  }
  const changeFilter = (newFilterValue: filterType) => {
    setFilter(newFilterValue);
  };
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
  const addNewTask = () => {
    addTask(newTaskTitle);
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
    <div>
      <h3>{title}</h3>
      <div>
        <input
          // ref={taskInputRef}
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          // minLength={3}
          // maxLength={5}
        />
        <Button
          title={"+"}
          // onClickhandler={addTaskHandler}
          onClickhandler={addNewTask}
          disabled={newTaskTitle.trim() === "" || newTaskTitle.length > 20}
        />
        {newTaskTitle.length > 10 && <div>recomend less than 10</div>}
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
