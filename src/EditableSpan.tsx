import { useState } from "react";

type Props = {
  value: string;
};
export const EditableSpan = ({ value }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => {
    setEditMode(true);
  };
  const activateViewMode = () => {
    setEditMode(false);
  };

  return editMode ? (
    <input value={value} onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  );
};
