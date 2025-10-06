import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/verify-user",
          { withCredentials: true }
        );
        // console.log(res.data.success);
        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(
          "Not authenticated:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ IsAuthenticated, setIsAuthenticated, Loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
