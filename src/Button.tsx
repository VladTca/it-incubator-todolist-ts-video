import React from "react";

type ButtonPropsType = {
  title: string;
  onClickhandler?: () => void;
  disabled?: boolean;
  classes?: string;
};
export const Button = ({
  title,
  onClickhandler,
  disabled,
  classes,
}: ButtonPropsType) => {
  return (
    <button onClick={onClickhandler} disabled={disabled} className={classes}>
      {title}
    </button>
  );
};
