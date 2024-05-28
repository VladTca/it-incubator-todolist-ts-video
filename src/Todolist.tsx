import React from "react";
import { Button } from "./Button";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
  changeFilter: (filter: "all" | "active" | "completed") => void;
  // tasks:TaskType[]; -------equal
};

export function Todolist({
  title,
  tasks,
  removeTask,
  changeFilter,
}: PropsType) {
  debugger;
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

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={"+"} />
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
