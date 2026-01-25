import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange-950 text-white text-center px-4">
      
      {/* Funny Face */}
      <div className="text-9xl mb-4 animate-bounce">🤯</div>

      <h1 className="text-6xl font-extrabold mb-2">404</h1>

      <p className="text-xl text-white/80 mb-6">
        Oops! Looks like this page has disappeared 😅
      </p>

      <p className="text-sm text-white/60 mb-8">
        Maybe the URL is wrong, or the page went on a vacation 🏖️
      </p>

      <Link
        to="/main"
        className="px-6 py-3 bg-amber-500 text-orange-950 rounded-xl font-semibold hover:bg-amber-400 transition transform hover:scale-105"
      >
        🚀 Take Me Home
      </Link>
    </div>
  );
};

export default NotFound;
