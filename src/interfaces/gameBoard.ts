export interface GameBoardProps {
  size: number;
  cells: string[];
  onCellClick: (index: number) => void;
  gameActive: boolean;
  winningLine?: number[];
}
