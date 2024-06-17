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

  const changeFilter = (newFilterValue: filterType, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = newFilterValue;
      setTodolists([...todolists]);
    }
  };

  type TodoListTypes = {
    id: string;
    title: string;
    filter: filterType;
  };
  let [todolists, setTodolists] = useState<TodoListTypes[]>([
    { id: v1(), title: "What to learn", filter: "active" },
    { id: v1(), title: "What to buy", filter: "completed" },
  ]);

  let [allTasks, setAllTasks] = useState<TaskType[]>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "REACT", isDone: false },
  ]);

  return (
    <div className="App">
      {todolists.map((todolist) => {
        let filteredTasks = tasks;
        switch (todolist.filter) {
          case "active":
            filteredTasks = tasks.filter((task) => !task.isDone);
            break;
          case "completed":
            filteredTasks = tasks.filter((task) => task.isDone);
            break;
        }

        return (
          <Todolist
            key={todolist.id}
            id={todolist.id}
            title={todolist.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={todolist.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
