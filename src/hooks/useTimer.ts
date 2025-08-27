import { useState } from "react";
import { useInterval } from "react-use";

export function useTimer(isActive: boolean) {
  const [ms, setMs] = useState(0);

  useInterval(
    () => {
      setMs((prev) => prev + 100);
    },
    isActive ? 100 : null
  );

  return [ms, setMs] as const;
}

export function formatMs(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const mm = Math.floor(totalSec / 60).toString().padStart(2, "0");
  const ss = (totalSec % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}
