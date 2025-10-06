import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [IsLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [SignUpName, setSignUpName] = useState("");
  const [SignupUsername, setSignupUsername] = useState("");
  const [SignupPassword, setSignupPassword] = useState("");
  const toggleLogin = () => setIsLogin((prev) => !prev);

  // const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  const signinHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/sign-in",
        { username: username, password: password },
        { withCredentials: true }
      );
      // console.log(res.data.message);
      toast.success(res.data.message);
      // setIsAuthenticated(true);
      navigate("/main");
      setUsername("");
      setPassword("");
    } catch (error) {
      // console.log(error.response.data.message);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-orange-950 flex items-center justify-center p-4">
      {IsLogin ? (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 max-w-xl w-full text-white text-center flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-3 text-[#d6b28d] drop-shadow-md flex justify-between">
            🍫 LOG-IN
            <Link to="/">🏠</Link>
          </h1>

          <div className="w-full flex flex-col gap-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Username"
              className="w-full py-2 px-1 border border-white/10 rounded-lg "
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter Paaword"
              className="w-full py-2 px-1 border border-white/10 rounded-lg "
            />
            <button
              onClick={signinHandler}
              className="bg-orange-950 text-[#d6b28d] font-semibold py-2 px-20 rounded shadow hover:bg-white/20 transition"
            >
              Login
            </button>
          </div>

          <p className="text-[#d6b28d]">OR</p>

          <div className=" text-white/50">
            <button onClick={toggleLogin} className="hover:text-[#d6b28d]">
              Sign Up Instead
            </button>
          </div>
        </div>
      ) : (
        // SignUp page
        // ==============>>>>>>>>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 max-w-xl w-full text-white text-center flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-3 text-[#d6b28d] drop-shadow-md flex justify-between">
            🍫 SIGN-UP
            <Link to="/">🏠</Link>
          </h1>

          <div className="w-full flex flex-col gap-4">
            <input
              value={SignUpName}
              onChange={(e) => setSignUpName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              className="w-full py-2 px-1 border border-white/10 rounded-lg "
            />

            <input
              value={SignupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              type="text"
              placeholder="Enter Username"
              className="w-full py-2 px-1 border border-white/10 rounded-lg "
            />
            <input
              value={SignupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              type="text"
              placeholder="Enter Paaword"
              className="w-full py-2 px-1 border border-white/10 rounded-lg "
            />
            <button className="bg-orange-950 text-[#d6b28d] font-semibold py-2 px-20 rounded shadow hover:bg-white/20 transition">
              Signup
            </button>
          </div>

          <p className="text-[#d6b28d]">OR</p>

          <div className=" text-white/50">
            <button onClick={toggleLogin} className="hover:text-[#d6b28d]">
              Sign In Instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
