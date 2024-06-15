import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
  };
  type TasksStateType = {
    [key: string]: TaskType[];
  };

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistId ? { ...el, filter: filter } : el,
      ),
    );

    //   const currentTodo = todolists.find((tl) => tl.id === todolistId);
    //   if (currentTodo) {
    //     currentTodo.filter = filter;
    //     setTodolists([...todolists]);
    //   }
  };

  // const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (taskId: string, todolistId: string) => {
    // 1. Найдем таски для тудулиста, в котором будет происходить удаление
    const todolistTasks = tasks[todolistId];
    // 2. Удалим таску по которой кликнули
    const newTodolistTasks = todolistTasks.filter((t) => t.id !== taskId);
    // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
    tasks[todolistId] = newTodolistTasks;
    // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks, newTodolistTasks });
  };
  // const removeTask = (taskId: string, todolistId: string) => {
  //   const newTodolistTasks = {
  //     ...tasks,
  //     [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
  //   };
  //   setTasks(newTodolistTasks);
  //   // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
  // };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistId));
    delete tasks[todolistId];
    console.log(tasks);
  };

  const addTask = (title: string, todolistId: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTaskStatus = (
    taskId: string,
    todolistId: string,
    isDone: boolean,
  ) => {
    // const newState = tasks[todolistId].map((t) =>
    //   t.id === taskId ? { ...t, isDone: taskStatus } : t,
    // );
    // tasks[todolistId] = newState;
    // setTasks({ ...tasks, newState });
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: isDone } : t,
      ),
    });
  };

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
          tasksForTodolist = tasks[tl.id].filter((task) => !task.isDone);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = tasks[tl.id].filter((task) => task.isDone);
        }

        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
