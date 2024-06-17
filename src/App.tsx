import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

function App() {
  console.log("App");

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "REACT", isDone: false },
  ]);
  console.log(tasks);

  const removeTask = (taskId: string) => {
    //иммутабельная работа
    const nextState = tasks.filter((task) => task.id !== taskId);
    setTasks(nextState);
    console.log(nextState);
  };

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
    // const taskForUpdate = tasks.find((t) => t.id === taskId);
    // if (taskForUpdate) {
    //   taskForUpdate.isDone = !taskForUpdate.isDone;
    //   setTasks([...tasks]);
    // }
    // // taskForUpdate &&
    // //   (taskForUpdate.isDone = !taskForUpdate.isDone) &&
    // //   setTasks([...tasks]);

    const nextState = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: newIsDone } : task,
    );

    setTasks(nextState);
  };
  type TodolistType = {
    id: string;
    title: string;
    filter: "all" | "active" | "completed";
  };
  let todlists: TodolistType[] = [
    { id: v1(), title: "what to learn", filter: "active" },
    { id: v1(), title: "what to buy", filter: "completed" },
  ];

  return (
    <div className="App">
      {todlists.map((tl) => {
        return (
          <Todolist
            key={tl.id}
            title={tl.title}
            tasks={tasks}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
}

export default App;
