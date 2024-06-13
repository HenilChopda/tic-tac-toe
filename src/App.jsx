import React, { useState } from 'react';
import './App.css';

var lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var counto = 0, countx=0 ; 
function App() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState(0);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (board) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const toggle = (idx) => {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = player ? 'X' : 'O';
    setBoard(newBoard);
    const calculatedWinner = calculateWinner(newBoard);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      console.log(player);
      if(player=='1') countx++;
      else if(player=='0') counto++;
    } else {
      setPlayer((prev) => (prev ? 0 : 1));
    }
  };

  const resetGame = () => {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setPlayer(0);
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <div className="win_num">Total : X {countx} , O {counto} </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${player ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {board.map((item, idx) => (
          <div key={idx} className="cell" id={`cell-${idx}`} onClick={() => toggle(idx)}>
            {item}
          </div>
        ))}
      </div>
      {winner && <button onClick={resetGame}>Reset Game</button>}
    </div>
  );
}

export default App;
