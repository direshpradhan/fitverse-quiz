import { createContext, FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loginService } from "../services/loginService/Login.services";
import { AuthContextType, LocationState } from "./AuthContext.types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const { token: localStorageToken } = JSON.parse(
    localStorage?.getItem("login") as string
  );
  const [token, setToken] = useState<string | null>(localStorageToken);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const loginUser = (loginToken: string | null) => {
    setToken(loginToken);
    localStorage?.setItem(
      "login",
      JSON.stringify({ login: true, token: loginToken })
    );
    navigate(state?.from ? state.from : "/");
  };

  const loginUserWithCredentials = async (email: string, password: string) => {
    try {
      const {
        data: { token, response },
        status,
      } = await loginService(email, password);
      if (status === 201) {
        loginUser(token);
      }
      return response;
    } catch (error) {
      const { response, message } = error;
      if (response.status === 401) {
        return response;
      }
      console.log("Error with login", message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user: null, loginUserWithCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};
