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

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={filteredTasks}
        changeFilter={changeFilter}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
