import React from "react";
import Cell from "./Cell";
import type { GameBoardProps } from "../interfaces/gameBoard";
import "../styles/GameBoard.scss";

const GameBoard: React.FC<GameBoardProps> = ({ size, cells, onCellClick, gameActive, winningLine }) => {
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 60px)` }}>
      {cells.map((value, i) => (
        <Cell
          key={i}
          value={value}
          onClick={() => onCellClick(i)}
          disabled={!gameActive || value !== ""}
          highlight={winningLine?.includes(i)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
