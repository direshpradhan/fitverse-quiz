import "./App.css";
import { useQuiz } from "./context/QuizContext";
import { quizOne } from "./data/quizData";

function App() {
  const { state, dispatch } = useQuiz();
  return (
    <div className="App">
      <h1>Quiz Master!!</h1>
      <h3>{quizOne.quizName}</h3>
      <div>Score: {state.score}</div>
      <div>Question No.:{state.currentQuestionNumber}</div>
      <div>{quizOne.questions[state.currentQuestionNumber - 1]?.question}</div>
      {quizOne.questions[state.currentQuestionNumber - 1]?.options.map(
        (option) => (
          <div
            onClick={() => {
              option.isRight
                ? dispatch({
                    type: "INCREMENT_SCORE",
                    payload: {
                      score:
                        quizOne.questions[state.currentQuestionNumber - 1]
                          .points,
                    },
                  })
                : dispatch({
                    type: "DECREMENT_SCORE",
                    payload: {
                      score:
                        quizOne.questions[state.currentQuestionNumber - 1]
                          ?.negativePoint,
                    },
                  });
              state.currentQuestionNumber < quizOne.questions.length &&
                dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
            }}
          >
            {option.text}
          </div>
        )
      )}
    </div>
  );
}

export default App;
