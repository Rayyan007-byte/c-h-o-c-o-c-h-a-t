import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TicTacToe from "../components/games/TicTacToe"; // import the tic-tac-toe component

const loggedIn = true;

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(loggedIn === "true");
  }, []);

  return (
    <div className="min-h-screen bg-orange-950  flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 max-w-4xl w-full text-white text-center">
        <h1 className="text-4xl font-bold mb-3 text-[#d6b28d] drop-shadow-md">
          🍫 ChocoChat
        </h1>
        <p className="text-base mb-6 text-[#d6b28d]">
          Smooth like cocoa, sweet like connection — Let's play & chat!
        </p>

        {isLoggedIn ? (
          <Link
            to="/chat"
            className="inline-block mb-6 bg-[#d6b28d] text-[#3b2b2b] font-semibold py-2 px-6 rounded-full shadow-md hover:bg-[#a87c5a] transition duration-300"
          >
            Start Chatting 🚀
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-3 mb-6">
            <p className="text-white/70 text-sm">
              Please log in to start chatting 🧑‍🚀
            </p>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-orange-950 text-[#d6b28d] font-semibold py-2 px-20 rounded shadow hover:bg-white/20 transition"
              >
                Log In
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-[#d6b28d]">
            Play Tic-Tac-Toe 🎯
          </h2>
          <TicTacToe />
        </div>

        <div className="mt-8 text-xs text-white/50">Made with 🍫 by Samar</div>
      </div>
    </div>
  );
};

export default Home;
