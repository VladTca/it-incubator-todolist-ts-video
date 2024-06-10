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

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        // tasks={filteredTasks}
        // changeFilter={changeFilter}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
