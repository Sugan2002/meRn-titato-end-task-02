### EX NO: 02

# <p align="center">React Application</P>

## Aim:
To create a react application for Tic Tac Toe game 

## Algorithm:

Step-1: Create a folder in cmd and import packages

Step-2: Create a components and create .jsx file folder

Step-3: As per the given task design the style.css

Step-4: Fetch the data by using API

Step-5: Run the program in npm start


## Program

### components

## Board.jsx
```
import Square from './Square';

const Board = ({ board, handleSquareEvent, winningSquare }) => {

  const updateSquare = position => {
    const isWinningSquare = winningSquare.includes(position);
    return (
      <Square
        value={board[position]}
        onClick={() => handleSquareEvent(position)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {updateSquare(0)}
        {updateSquare(1)}
        {updateSquare(2)}
      </div>

      <div className="board-row">
        {updateSquare(3)}
        {updateSquare(4)}
        {updateSquare(5)}
      </div>

      <div className="board-row">
        {updateSquare(6)}
        {updateSquare(7)}
        {updateSquare(8)}
      </div>
    </div>
  );
};

export default Board;
```

## Messages.jsx
```
const Messages = ({ winner, board, isXNext }) => {

  const noMoves = board.every((el) => el !== null);

  return (
    <div className="status-message">
      
      {!winner && !noMoves && (
        <>
          Turn player is{' '}
          <span className={isXNext ? 'text-green' : 'text-orange'}>
            {isXNext ? 'X' : 'O'}
          </span>
        </>
      )}
      {!winner && noMoves && (
        <>
          <span className="text-green">X</span> and{' '}
          <span className="text-orange">O</span> are both tied !!!!!
        </>
      )}
      
    </div>
  );
};

export default Messages;

```
## Square.jsx
```
import React from 'react';

const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`square ${isWinningSquare ? 'winning' : ''} ${
        value === 'X' ? 'text-green' : 'text-orange'
      }`}
    >
      {value}
    </button>
  );
};

export default Square;

```

### app.scss
```
$green: #50ca1fce;
$orange: #e69124f8;
$blue: #253b7e;

    
body {
  font-family: 'Ninja Naruto', sans-serif;
  background-color: $blue;
  color: #fff;
  padding-top: 50px;
  margin: 0;
}

button {
  background: none;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
}

.board {
  .board-row {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #fff;
    &:last-child {
      border-bottom: none;
    }
    .square {
      width: 80px;
      height: 80px;
      border-right: 2px solid #fff;
      font-size: 2.5rem;
      padding: 0;
      overflow: hidden;
      transition: all 0.2s;
      &:last-child {
        border-right: none;
      }
      &.winning {
        animation: scaleText 1.5s ease-in infinite;
        @keyframes scaleText {
          0% {
            transform: 2.5rem;
          }
          50% {
            font-size: 3rem;
          }
          100% {
            font-size: 2.5rem;
          }
        }
      }
    }
  }
}

.app {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-green {
  color: $green;
}

.text-orange {
  color: $orange;
}

.status-message {
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: lighter;
  span {
    font-weight: normal;
  }
}

.btn-reset {
  font-size: 1rem;
  color: #fff;
  border-radius: 15px;
  padding: 12px 18px;
  margin-top: 39px;
  transition: all 0.2s;
  background-color: $blue;
  box-shadow: 0px 0px 0px 1px $orange;
  &.active {
    background-color: $orange;
    box-shadow: none;
  }
  
}

.bg-balls {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100%;
  z-index: -1;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 70%;
  }

  &:before {
    background-color: $orange;
    right: -75px;
    bottom: -75px;
    @media screen and (min-width: 476px) {
      width: 220px;
      height: 220px;
      right: -110px;
      bottom: -110px;
    }
  }

  &:after {
    background-color: $green;
    top: -75px;
    left: -75px;
    @media screen and (min-width: 476px) {
      width: 220px;
      height: 220px;
      top: -110px;
      left: -110px;
    }
  }
}
```

## App.jsx
```
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
```

## index.jsx
```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```
## Logic.jsx
```
export function calculateWinner(blocks) {
  const pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < pattern.length; i++) {
    const [a, b, c] = pattern[i];

    if (blocks[a] && blocks[a] === blocks[b] && blocks[a] === blocks[c]) {
      return {
        winner: blocks[a],
        winningSquare: pattern[i],
      };
    }
  }
  return {
    winner: null,
    winningSquare: [],
  };
}

```
## Output

![image](https://github.com/Sugan2002/titato-end-task/assets/77089743/960f82d8-fb98-4963-8250-cb4867f8d33d)

![image](https://github.com/Sugan2002/titato-end-task/assets/77089743/c83cfc77-f9ae-4692-a54d-d8fd55f3251e)

![image](https://github.com/Sugan2002/titato-end-task/assets/77089743/0138a87c-1c56-40dd-a5ee-abfdf874fddd)

## Result
Thus, a react application for Tic Tac Toe game  is successfully developed.
