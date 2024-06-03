import React from "react";

type ButtonPropsType = {
  title: string;
  onClickhandler?: () => void;
  disabled?: boolean;
};
export const Button = ({
  title,
  onClickhandler,
  disabled,
}: ButtonPropsType) => {
  return (
    <button onClick={onClickhandler} disabled={disabled}>
      {title}
    </button>
  );
};
