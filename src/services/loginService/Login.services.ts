import axios from "axios";
import { DATABASE_URL } from "../../constants";

export const loginService = async (email: string, password: string) => {
  return axios.post(`${DATABASE_URL}/user/login`, {
    email,
    password,
  });
};
