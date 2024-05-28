import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

function App() {
  console.log("App");

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "REACT", isDone: false },
  ]);

  const removeTask = (taskId: number) => {
    //иммутабельная работа
    const nextState = tasks.filter((task) => task.id !== taskId);
    setTasks(nextState);
    console.log(nextState);
  };

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
      />
    </div>
  );
}

export default App;
