import { createContext, FunctionComponent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loginService } from "../../services/loginService/Login.services";
import { signupService } from "../../services/signupService/Signup.services";
import { AuthContextType, LocationState } from "./AuthContext.types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const loginObject = JSON.parse(localStorage?.getItem("login") as string);
  const [token, setToken] = useState<string | null>(loginObject?.token);
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

  const signupWithUserData = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const {
        data: { token, response },
        status,
      } = await signupService({
        firstName,
        lastName,
        email,
        password,
      });

      if (status === 201) {
        loginUser(token);
      }
      return response;
    } catch (error) {
      const { response, message } = error;
      if (response.status === 403) {
        return response;
      }
      console.log("Error with signup", message);
    }
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("login");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        loginUserWithCredentials,
        signupWithUserData,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
