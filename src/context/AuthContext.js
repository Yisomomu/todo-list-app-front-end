import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token", "user"]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (() => {
      setToken(cookies.token);
    })();
  });

  const logout = () => {
    setCookie("token", "", { path: "/", maxAge: 0 });
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, setCookie, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
