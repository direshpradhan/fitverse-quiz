import { Navigate, Route } from "react-router";
import { useAuth } from "../context/auth/AuthContext";

export const PrivateRoute = ({ path, ...props }: any) => {
  const { token } = useAuth();
  console.log("entered private route");
  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
