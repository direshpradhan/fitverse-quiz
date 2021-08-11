import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";

export const Login = () => {
  const { token, loginUserWithCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (event: any) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      loginUserWithCredentials(email, password);
    }
  };

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);
  return (
    <div className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 pt-52 mx-auto h-screen">
      <h2 className="font-bold text-3xl text-center mb-4">
        Login to Fitverse Quiz
      </h2>
      <form className="flex flex-col" onSubmit={(event) => loginHandler(event)}>
        <input
          type="text"
          placeholder="Email/Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-4 py-2 px-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-2 px-4 border rounded-md "
        />
        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600">
          Signup
        </a>
      </p>
    </div>
  );
};
