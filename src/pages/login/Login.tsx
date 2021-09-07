import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";

export const Login = () => {
  const { token, loginUserWithCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle");
  const navigate = useNavigate();

  const loginHandler = (event: any) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      setLoginStatus("loading");
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
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md "
        />
        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 text-lg font-semibold rounded-md"
        >
          {loginStatus === "loading" ? "Logging in. Please wait..." : "Login"}
        </button>
      </form>
      <p
        className="mt-2 text-center text-blue-600 font-semibold text-lg cursor-pointer hover:underline"
        onClick={() => {
          loginUserWithCredentials("test@test.com", "test@123");
          setLoginStatus("loading");
        }}
      >
        Login as guest
      </p>
      <p className="text-center mt-4 text-lg">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Signup
        </a>
      </p>
    </div>
  );
};
