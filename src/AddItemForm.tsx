import React, { useState } from "react";
import { Button } from "./Button";

type AddItemFormPropsType = {
  addTask: (title: string, todolistId: string) => void;
  id: string;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const OnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };
  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim(), props.id);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <input
        value={title}
        onChange={OnChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <Button title={"+"} onClickhandler={addTask} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
