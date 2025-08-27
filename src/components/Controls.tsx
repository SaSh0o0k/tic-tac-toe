import React from "react";
import type { ControlsProps } from "../interfaces/controls";
import "../styles/Controls.scss";

const Controls: React.FC<ControlsProps> = ({
  size,
  onSizeChange,
  onNewGame,
  currentPlayer,
  totalGames,
}) => {
  return (
    <div className="controls">
      <p>Ходить: {currentPlayer === "X" ? "Гравець 1" : "Гравець 2"}</p>
      <p>Зіграно ігор: {totalGames}</p>
      <select value={size} onChange={(e) => onSizeChange(Number(e.target.value))}>
        {[3, 4, 5, 6, 7, 8, 9].map((s) => (
          <option key={s} value={s}>
            {s} x {s}
          </option>
        ))}
      </select>
      <button onClick={onNewGame}>Нова гра</button>
    </div>
  );
};

export default Controls;
