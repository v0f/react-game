import React from 'react';
import './BoardInfo.css';

function BoardInfo({ className, playerName, playerStat }) {
  return (
    <div className={`BoardInfo ${className}`}>
      <div className="playerName">{playerName}</div>
      <div className="playerScore">
        <span>score: </span>
        {playerStat?.hits || 0}
      </div>
      <div className="playerMoves">
        <span>moves: </span>
        {playerStat?.shots || 0}
      </div>
    </div>
  );
}

export default BoardInfo;
