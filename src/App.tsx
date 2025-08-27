import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import PlayerInfo from "./components/PlayerInfo";
import Controls from "./components/Controls";
import Modal from "react-modal";
import { useTimer, formatMs } from "./hooks/useTimer";
import { WIN_COUNT } from "./interfaces/constants";
import type { WinnerResult } from "./interfaces/app";
import "./styles/App.scss";

Modal.setAppElement("#root");

const App: React.FC = () => {
  const [size, setSize] = useState(3);
  const [pendingSize, setPendingSize] = useState(3);
  const [totalGames, setTotalGames] = useState(0);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [cells, setCells] = useState(Array(size * size).fill(""));
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const [player1Time, setPlayer1Time] = useTimer(currentPlayer === "X" && gameActive);
  const [player2Time, setPlayer2Time] = useTimer(currentPlayer === "O" && gameActive);

  // змінюємо розмір тільки у pending
  const handleSizeChange = (newSize: number) => {
    setPendingSize(newSize);
  };

  const handleNewGame = () => {
    setSize(pendingSize);
    setCells(Array(pendingSize * pendingSize).fill(""));
    setCurrentPlayer("X");
    setModalMessage(null);
    setShowModal(false);
    setWinningLine(null);
    setPlayer1Time(0);
    setPlayer2Time(0);
    setGameActive(true);
  };

  const checkWinner = (cells: string[], size: number): WinnerResult | null => {
    const directions = [
      { dr: 0, dc: 1 },  // рядок
      { dr: 1, dc: 0 },  // колонка
      { dr: 1, dc: 1 },  // діагональ \
      { dr: 1, dc: -1 }, // діагональ /
    ];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const startIdx = r * size + c;
        const player = cells[startIdx];
        if (!player) continue;

        for (const { dr, dc } of directions) {
          const line: number[] = [];
          let won = true;

          for (let k = 0; k < WIN_COUNT; k++) {
            const nr = r + dr * k;
            const nc = c + dc * k;
            if (nr >= size || nr < 0 || nc >= size || nc < 0) {
              won = false;
              break;
            }
            const idx = nr * size + nc;
            if (cells[idx] !== player) {
              won = false;
              break;
            }
            line.push(idx);
          }

          if (won) return { winner: player as "X" | "O", line };
        }
      }
    }

    if (cells.every((c) => c)) return { winner: "draw" };

    return null;
  };


  const handleCellClick = (index: number) => {
    if (!gameActive || cells[index] !== "") return;

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);

    const result = checkWinner(newCells, size);
    if (result) {
      setGameActive(false);
      if (result.winner !== "draw") setWinningLine(result.line!);
      setTimeout(() => handleGameEnd(result.winner), 2000);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleGameEnd = (winner: "X" | "O" | "draw") => {
    setTotalGames((prev) => prev + 1);

    if (winner === "X") {
      setPlayer1Wins((prev) => prev + 1);
      setModalMessage(`Гравець 1 переміг! Час гри: ${formatMs(player1Time)}`);
    } else if (winner === "O") {
      setPlayer2Wins((prev) => prev + 1);
      setModalMessage(`Гравець 2 переміг! Час гри: ${formatMs(player2Time)}`);
    } else {
      setModalMessage(`Нічия! Загальний час гри: ${formatMs(player1Time + player2Time)}`);
    }

    setShowModal(true);
  };

  return (
    <div className="app">
      <h1 className="app__title">Хрестики-Нулики</h1>

      <div className="app__players">
        <PlayerInfo name="ГРАВЕЦЬ 1" symbol="X" wins={player1Wins} time={player1Time} />
        <PlayerInfo name="ГРАВЕЦЬ 2" symbol="O" wins={player2Wins} time={player2Time} />
      </div>

      <Controls
        size={pendingSize}
        onSizeChange={handleSizeChange}
        onNewGame={handleNewGame}
        currentPlayer={currentPlayer}
        totalGames={totalGames}
      />

      <GameBoard
        size={size}
        cells={cells}
        onCellClick={handleCellClick}
        gameActive={gameActive}
        winningLine={winningLine || undefined}
      />

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <p>{modalMessage}</p>
        <button onClick={() => setShowModal(false)}>Ок</button>
      </Modal>
    </div>
  );
};

export default App;
