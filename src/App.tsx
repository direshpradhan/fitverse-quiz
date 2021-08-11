import "./App.css";
import { Quiz } from "./pages/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";
import { useQuiz } from "./context/quiz/QuizContext";
import { Login } from "./pages/login/Login";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Signup } from "./pages/signup/Signup";

function App() {
  const {
    state: { currentQuiz },
  } = useQuiz();
  return (
    <div className="App">
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
