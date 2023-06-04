import React, { useState } from 'react';
import Board from './components/Board';
import './styles/app.scss';
import { calculateWinner } from './Logic';
import Messages from './components/Messages';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsNext] = useState(false);
  const { winner, winningSquare } = calculateWinner(board);

  const [playerXWins, setPlayerXWins] = useState(0);
  const [playerOWins, setPlayerOWins] = useState(0);
  const [gameWinner, setGameWinner] = useState('');

  const handleSquareEvent = (position) => {
    if (board[position] || winner || gameWinner) {
      return;
    }

    setBoard((prev) => {
      return prev.map((square, pos) => {
        if (pos === position) {
          return isXNext ? 'X' : 'O';
        }
        return square;
      });
    });

    setIsNext((prev) => !prev);
  };

  const handleGameResult = (player) => {
    if (player === 'X') {
      setPlayerXWins((prevWins) => prevWins + 1);
      setBoard(Array(9).fill(null));
      if (playerXWins + 1 === 3) {
        setGameWinner('X');
        setBoard(Array(9).fill(null));
      }
    } else if (player === 'O') {
      setPlayerOWins((prevWins) => prevWins + 1);
      setBoard(Array(9).fill(null));
      if (playerOWins + 1 === 3) {
        setGameWinner('O');
        setBoard(Array(9).fill(null));
      }
    }
  };

  

  return (
    <div className="app">
      <h1>
        TI <span className="text-green">TA</span> TO
      </h1>
      <Messages winner={winner} board={board} isXNext={isXNext} />
      <Board
        board={board}
        handleSquareEvent={handleSquareEvent}
        winningSquare={winningSquare}
      />

      {gameWinner && <div>Game's winner is Player {gameWinner}!</div>}

      {winner && (
         <>
          Winner is{' '}
           <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
           </span>
         </>
       )}

      <div>Player X wins: {playerXWins}</div>
      <div>Player O wins: {playerOWins}</div>

      {playerXWins < 3 && playerOWins < 3 && (
        <button onClick={() => handleGameResult(winner)} className={`btn-reset`}>
          Next Round
        </button>
      )}

<button
        onClick={() => window.location.reload(false)}
        className={`btn-reset ${winner ? 'active' : ' '}`}
      >
        Reset the game !
      </button>

      <div className="bg-balls" />
    </div>
  );
};

export default App;
