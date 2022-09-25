import { FC, PropsWithChildren } from "react";

export interface ButtonProps {
  onClick: () => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button
      className="bg-blue-500 px-3 py-2 hover:bg-blue-100 rounded text-white hover:text-black font-semibold tracking-wide select-none transition-all"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};