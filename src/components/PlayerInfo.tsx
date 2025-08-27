import React from "react";
import { formatMs } from "../hooks/useTimer";
import type { PlayerInfoProps } from "../interfaces/playerInfo";
import "../styles/PlayerInfo.scss";

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, symbol, wins, time }) => {
  return (
    <div className="player-info">
      <div>{name}</div>
      <div>Символ: {symbol}</div>
      <div>Перемог: {wins}</div>
      <div>Час: {formatMs(time)}</div>
    </div>
  );
};

export default PlayerInfo;
