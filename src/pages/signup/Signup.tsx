import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, signupWithUserData } = useAuth();

  const signupHandler = (event: any) => {
    event.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      signupWithUserData(firstName, lastName, email, password);
    }
  };

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 pt-40 mx-auto">
      <h2 className="font-bold text-3xl text-center mb-4">
        Sign up for Fitverse Social
      </h2>
      <form
        onSubmit={(event) => signupHandler(event)}
        className="flex flex-col"
      >
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-4 py-2 pl-4 w-1/2 mr-1 border rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
            className="mt-4 py-2 pl-4 w-1/2 ml-1 border rounded-md"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          className="mt-4 py-2 px-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-2 px-4 border rounded-md"
        />
        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 rounded-md"
        >
          Signup
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600">
          Login
        </a>
      </p>
    </div>
  );
};
