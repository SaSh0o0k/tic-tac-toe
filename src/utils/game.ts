import { WIN_COUNT } from "./constants";
import type { WinnerResult } from "../interfaces/app";

export const checkWinner = (cells: string[], size: number): WinnerResult | null => {
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
