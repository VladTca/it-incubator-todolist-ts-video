import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

function App() {
  console.log("App");

  type filterType = "all" | "active" | "completed";

  type TodoListTypes = {
    id: string;
    title: string;
    filter: filterType;
  };

  let todolistID1 = v1();
  let todoListID2 = v1();

  let [todolists, setTodolists] = useState<TodoListTypes[]>([
    { id: todolistID1, title: "What to learn", filter: "active" },
    { id: todoListID2, title: "What to buy", filter: "completed" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
    ],
    [todoListID2]: [
      { id: v1(), title: "bread", isDone: true },
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "tea", isDone: false },
    ],
  });
  // /----------------------------------------------------------------------------/
  const removeTask = (taskId: string, todolistId: string) => {
    // Иммутабельная работа
    const nextState = tasks[todolistId].filter((task) => task.id !== taskId);
    setTasks({ ...tasks, [todolistId]: nextState });
  };

  function addTask(title: string, todolistID: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], newTask] });
  }

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ) => {
    const updatedTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, isDone } : task,
    );
    setTasks({ ...tasks, [todolistId]: updatedTasks });
  };

  const changeFilter = (newFilterValue: filterType, todolistId: string) => {
    const updatedTodolists = todolists.map((tl) =>
      tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl,
    );
    setTodolists(updatedTodolists);
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  return (
    <div className="App">
      <input /> <button>x</button>
      {todolists.map((todolist) => (
        <Todolist
          key={todolist.id}
          id={todolist.id}
          title={todolist.title}
          tasks={tasks[todolist.id]}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          filter={todolist.filter}
          changeStatus={changeStatus}
          removeTodolist={removeTodolist}
        />
      ))}
      {todolists.map((todolist) => {
        let filteredTasks = tasks[todolist.id];
        if (!filteredTasks) {
          filteredTasks = [];
        }
        switch (todolist.filter) {
          case "active":
            filteredTasks = filteredTasks.filter((task) => !task.isDone);
            break;
          case "completed":
            filteredTasks = filteredTasks.filter((task) => task.isDone);
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
            changeStatus={changeStatus}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
