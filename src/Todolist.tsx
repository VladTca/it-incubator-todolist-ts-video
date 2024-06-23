import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  todolistId: string;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    taskStatus: boolean,
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    removeTodolist,
    todolistId,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todolistId, filter);
  };

  return (
    <div>
      <h3>
        {title}
        <button onClick={() => removeTodolist(props.todolistId)}>x</button>
      </h3>
      <AddItemForm addTask={addTask} todolistId={todolistId} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, props.todolistId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>,
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, props.todolistId, newStatusValue);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button onClick={removeTaskHandler} title={"x"} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
