
import React, { useState } from 'react';

const GamesRoom: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'User A (X)' : 'User B (O)'}`;

  return (
    <div className="flex-1 flex flex-col p-6 bg-[#050505]">
      <header className="mb-8">
        <h2 className="text-2xl font-bold">Arcade Nexus</h2>
        <p className="text-gray-500 text-sm">Real-time multiplayer mini-games</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="glass-panel p-8 rounded-[40px] flex flex-col items-center">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold mb-1">Tic-Tac-Toe</h3>
            <p className={`text-sm ${winner ? 'text-green-500 font-bold' : 'text-blue-500'}`}>{status}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {board.map((val, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className="w-20 h-20 md:w-24 md:h-24 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center text-4xl font-bold transition-all border border-white/5 active:scale-95"
              >
                {val === 'X' ? <span className="text-blue-500">X</span> : val === 'O' ? <span className="text-pink-500">O</span> : null}
              </button>
            ))}
          </div>

          <button 
            onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }}
            className="mt-8 text-sm text-gray-500 hover:text-white transition-all underline underline-offset-4"
          >
            Reset Match
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-bold">Other Games</h4>
          {[
            { name: 'Ludo Pro', icon: 'fa-dice', color: 'text-red-500', players: 2 },
            { name: 'Chess Grandmaster', icon: 'fa-chess', color: 'text-white', players: 2 },
            { name: 'Private Cards', icon: 'fa-cards-blank', color: 'text-blue-400', players: 2 },
          ].map(game => (
            <div key={game.name} className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/20 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${game.color}`}>
                  <i className={`fas ${game.icon} text-xl`}></i>
                </div>
                <div>
                  <h5 className="font-bold text-sm">{game.name}</h5>
                  <p className="text-[10px] text-gray-500">{game.players}nd Generation Protocol</p>
                </div>
              </div>
              <button className="text-xs bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full font-bold">READY</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesRoom;
