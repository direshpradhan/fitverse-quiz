import axios, { AxiosError } from "axios";
import { createContext, FunctionComponent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loginService } from "../../services/loginService/Login.services";
import { signupService } from "../../services/signupService/Signup.services";
import { setupAuthHeadersForServiceCalls } from "../../utils/setupAuthHeadersForServiceCalls";
import { AuthContextType, LocationState } from "./AuthContext.types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const loginObject = JSON.parse(localStorage?.getItem("login") as string);
  const [token, setToken] = useState<string | null>(loginObject?.token);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  token && setupAuthHeadersForServiceCalls(token);

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 403) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const loginUser = (loginToken: string | null) => {
    setToken(loginToken);
    setupAuthHeadersForServiceCalls(loginToken);
    localStorage?.setItem(
      "login",
      JSON.stringify({ login: true, token: loginToken })
    );
    navigate(state?.from ? state.from : "/");
  };

  const loginUserWithCredentials = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);
      const {
        data: { token },
        status,
      } = response;
      if (status === 201) {
        loginUser(token);
      }
      return response;
    } catch (error) {
      const { response, message } = error as AxiosError;
      console.log("Error with login", message);
      return response;
    }
  };

  const signupWithUserData = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await signupService({
        firstName,
        lastName,
        email,
        password,
      });

      const {
        data: { token },
        status,
      } = response;

      if (status === 201) {
        loginUser(token);
      }
      return response;
    } catch (error) {
      const { response, message } = error as AxiosError;
      console.log("Error with signup", message);
      return response;
    }
  };

  const logoutUser = () => {
    setToken(null);
    setupAuthHeadersForServiceCalls(null);
    localStorage.removeItem("login");
    navigate("/login");
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
