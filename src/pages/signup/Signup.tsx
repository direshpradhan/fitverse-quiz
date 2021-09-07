import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "../../components/Alert";
import { useAuth } from "../../context/auth/AuthContext";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupStatus, setSignupStatus] = useState("idle");
  const navigate = useNavigate();
  const { token, signupWithUserData } = useAuth();

  const signupHandler = async (event: any) => {
    event.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      setSignupStatus("loading");
      const response = await signupWithUserData(
        firstName,
        lastName,
        email,
        password
      );
      if (response.status === 401 || response.status === 403) {
        setErrorMessage(response.data.message);
        setSignupStatus("error");
      }
      setSignupStatus("fulfilled");
    } else {
      if (firstName === "") {
        setErrorMessage("Please enter First Name !!");
      } else if (lastName === "") {
        setErrorMessage("Please enter Last Name !!");
      } else if (email === "") {
        setErrorMessage("Please enter Email !!");
      } else if (password === "") {
        setErrorMessage("Please enter Password !!");
      }
    }
  };

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 pt-40 mx-auto">
      <h2 className="font-bold text-3xl text-center mb-4">
        Sign up for Fitverse Quiz
      </h2>
      {errorMessage && <Alert message={errorMessage} />}
      <form
        onSubmit={(event) => signupHandler(event)}
        className="flex flex-col"
      >
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-4 py-3 pl-4 w-1/2 mr-1 border rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
            className="mt-4 py-3 pl-4 w-1/2 ml-1 border rounded-md"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md"
        />
        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 text-lg font-semibold rounded-md"
        >
          {signupStatus === "loading" ? "Signing up. Please wait..." : "Signup"}
        </button>
      </form>
      <p className="text-center mt-4 text-lg">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};
