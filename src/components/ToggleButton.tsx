import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

export interface ToggleButtonProps {
  selected: boolean
  enabled?: boolean
  onClick: () => void;
}

export const ToggleButton: FC<PropsWithChildren<ToggleButtonProps>> = (props) => {
  const enabled = props.enabled??true
  return (
    <button
      className={classNames("px-3 py-2 select-none text-white tracking-wide transition-all", {
        "opacity-100": enabled,
        "opacity-60 pointer-events-none": !enabled,
        "bg-blue-500 hover:bg-blue-400 font-semibold": props.selected,
        "bg-gray-200 text-gray-500 hover:text-black": !props.selected
      })}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};