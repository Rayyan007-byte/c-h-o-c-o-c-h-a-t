import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setXTurn(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-16 h-16 text-xl md:text-2xl font-bold flex items-center justify-center bg-[#fff6f0] text-[#3b2b2b] rounded shadow cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner ? (
        <p className="text-[#d6b28d] font-semibold mb-2">{winner} wins! 🥳</p>
      ) : board.every((cell) => cell !== "") ? (
        <p className="text-[#d6b28d] font-semibold mb-2">It's a draw! 🤝</p>
      ) : null}

      <button
        onClick={resetGame}
        className="bg-[#d6b28d] text-[#3b2b2b] font-semibold py-1 px-4 rounded-full hover:bg-[#a87c5a] transition"
      >
        Reset
      </button>
    </div>
  );
};

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;
