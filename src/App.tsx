import "./App.css";
import { Quiz } from "./pages/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";
import { useQuiz } from "./context/quiz/QuizContext";
import { Login } from "./pages/login/Login";

function App() {
  const {
    state: { currentQuiz },
  } = useQuiz();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        {currentQuiz && <Route path="/result" element={<Result />} />}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
