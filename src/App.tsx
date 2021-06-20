// import { useState } from "react";
import "./App.css";
import { useQuiz } from "./context/QuizContext";
import { quizOne } from "./data/quizData";

function App() {
  // const [score, setScore] = useState(0);
  const { state, dispatch } = useQuiz();
  return (
    <div className="App">
      <h1>Quiz Master!!</h1>
      <h3>{quizOne.quizName}</h3>
      <div>Score: {state.score}</div>
      <div>Question No.:{state.currentQuestionNumber}</div>
      <button
        onClick={() =>
          dispatch({ type: "INCREMENT_SCORE", payload: { score: 10 } })
        }
      >
        Score ++
      </button>
    </div>
  );
}

export default App;
