import { DATABASE_URL } from "./../../constants";
import axios from "axios";
import { SignupDataType } from "../../context/auth/AuthContext.types";

export const signupService = async (signupData: SignupDataType) => {
  const { firstName, lastName, email, password } = signupData;
  return axios.post(`${DATABASE_URL}/user/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
};
