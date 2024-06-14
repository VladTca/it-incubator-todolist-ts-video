import React, { useRef, useState } from "react";
import { Button } from "./Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type filterType = "all" | "active" | "completed";
type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filterx: filterType;
  removeTask: (taskId: string) => void;
  // changeFilter: (filter: "all" | "active" | "completed") => void;
  addTask: (title: string) => void;
  // tasks:TaskType[]; -------equal

  changeTaskStatus: (taskId: string, newIsDone: boolean) => void;
};

export function Todolist({
  title,
  tasks,
  removeTask,
  filterx,
  // changeFilter,
  addTask,
  changeTaskStatus,
}: PropsType) {
  const [filter, setFilter] = useState<filterType>(filterx);
  // filterx

  const changeFilter = (newFilterValue: filterType) => {
    setFilter(newFilterValue);
  };
  const filteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.isDone);
      case "completed":
        return tasks.filter((task) => task.isDone);

      default:
        return tasks;
    }
  };

  const taskLists =
    tasks.length === 0 ? (
      <span> Your tasklist is empty</span>
    ) : (
      <ul>
        {filteredTasks().map((task) => {
          const removeHandler = () => removeTask(task.id);
          const changeTaskStatusHandler = (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
          };

          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />
              <span className={task.isDone ? "task-done" : ""}>
                {task.title}
              </span>
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
    error && setError(null);
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
          onClickhandler={() => changeFilter("all")}
          title={"All"}
        />
        <Button
          classes={filter === "active" ? "btn-folder-active" : ""}
          onClickhandler={() => changeFilter("active")}
          title={"Active"}
        />
        <Button
          classes={filter === "completed" ? "btn-folder-active" : ""}
          onClickhandler={() => changeFilter("completed")}
          title={"Completed"}
        />
      </div>
    </div>
  );
}
