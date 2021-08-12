import "./App.css";
import { Quiz } from "./pages/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";
import { useQuiz } from "./context/quiz/QuizContext";
import { Login } from "./pages/login/Login";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Signup } from "./pages/signup/Signup";
import { useAuth } from "./context/auth/AuthContext";
import { Nav } from "./components/Nav";

function App() {
  const {
    state: { currentQuiz },
  } = useQuiz();
  const { token } = useAuth();

  return (
    <div className="App">
      {token && <Nav />}
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/quiz/:quizId" element={<Quiz />} />
        {currentQuiz && <PrivateRoute path="/result" element={<Result />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
