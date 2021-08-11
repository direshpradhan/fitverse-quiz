export type LoginUser = (email: string, password: string) => Promise<any>;

export type SignupUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => Promise<any>;

export type AuthContextType = {
  token: string | null;
  user: User | null;
  loginUserWithCredentials: LoginUser;
  signupWithUserData: SignupUser;
  logoutUser: Function;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type LocationState = {
  from: string;
};

export type SignupDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
