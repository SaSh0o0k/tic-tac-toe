import React from "react";
import type { CellProps } from "../interfaces/cell";
import "../styles/Cell.scss";

const Cell: React.FC<CellProps> = ({ value, onClick, disabled, highlight }) => {
  return (
    <div
      className={`cell ${disabled ? "cell--disabled" : ""} ${highlight ? "cell--highlight" : ""}`}
      onClick={() => !disabled && onClick()}
    >
      {value}
    </div>
  );
};

export default Cell;
