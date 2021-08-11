import axios from "axios";
import { API_URL } from "../../utils/constants";

export const loginService = async (email: string, password: string) => {
  return axios.post(`${API_URL}/user/login`, {
    email,
    password,
  });
};
