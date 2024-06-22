import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { id: string; title: string; filter: FilterValuesType };
type TasksType = {
  [key: string]: TaskType[];
};

function App() {
  type TodolistType = {
    id: string;
    title: string;
  };

  type TasksStateType = {
    [key: string]: {
      data: Array<TaskType>;
      filter: FilterValuesType;
    };
  };

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn" },
    { id: todolistId2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: {
      data: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
      ],
      filter: "all",
    },
    [todolistId2]: {
      data: [
        { id: v1(), title: "HTML&CSS2", isDone: true },
        { id: v1(), title: "JS2", isDone: true },
        { id: v1(), title: "ReactJS2", isDone: false },
      ],
      filter: "all",
    },
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistId));
    const newTasks = { ...tasks };
    delete newTasks[todolistId];
    setTasks(newTasks);
  };

  function removeTask(todolistId: string, taskId: string) {
    const newTasks = tasks[todolistId].data.filter(
      (task) => task.id !== taskId,
    );
    setTasks({
      ...tasks,
      [todolistId]: { ...tasks[todolistId], data: newTasks },
    });
  }

  function addTask(todolistId: string, title: string) {
    const newTask = { id: v1(), title: title, isDone: false };
    const newTasks = [newTask, ...tasks[todolistId].data];
    setTasks({
      ...tasks,
      [todolistId]: { ...tasks[todolistId], data: newTasks },
    });
  }

  function changeStatus(
    todolistId: string,
    taskId: string,
    newIsDone: boolean,
  ) {
    const newTasks = tasks[todolistId].data.map((task) =>
      task.id === taskId ? { ...task, isDone: newIsDone } : task,
    );
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.map((task) =>
          task.id === taskId ? { ...task, isDone: newIsDone } : task,
        ),
      },
    });
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTasks({
      ...tasks,
      [todolistId]: { ...tasks[todolistId], filter: value },
    });
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        // let tasksForTodolist = tasks[el.id].data;
        // if (tasks[el.id].filter === "active") {
        //   tasksForTodolist = tasks[el.id].data.filter(
        //     (t) => t.isDone === false,
        //   );
        // }
        // if (tasks[el.id].filter === "completed") {
        //   tasksForTodolist = tasks[el.id].data.filter((t) => t.isDone === true);
        // }
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasks[el.id].data}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tasks[el.id].filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
