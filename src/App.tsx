import "./App.css";
import { Quiz } from "./pages/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";
import { useQuiz } from "./context/QuizContext";

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
      </Routes>
    </div>
  );
}

export default App;
