export interface ControlsProps {
  size: number;
  onSizeChange: (size: number) => void;
  onNewGame: () => void;
  currentPlayer: "X" | "O";
  totalGames: number;
}
