import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";
import { useQuiz } from "../../context/quiz/QuizContext";
import { Option, Question } from "../../data/quizData.types";
import { API_URL } from "../../utils/constants";
import { InstructionsModal } from "./components/InstructionsModal";

export const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    state: { score, currentQuestionNumber, isOptionClickDisabled, currentQuiz },
    dispatch,
  } = useQuiz();
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const currentQuestion = currentQuiz?.questions[
    currentQuestionNumber - 1
  ] as Question;

  const updateScore = (option: Option) => {
    option.isRight
      ? dispatch({
          type: "INCREMENT_SCORE",
          payload: {
            score: currentQuestion.points,
          },
        })
      : dispatch({
          type: "DECREMENT_SCORE",
          payload: {
            score: currentQuestion?.negativePoint as Number,
          },
        });
  };

  const optionClickHandler = (option: Option) => {
    setSelectedOptionId(() => option._id);
    dispatch({ type: "DISABLE_OPTION_CLICK" });
    dispatch({
      type: "SET_SELECTED_OPTION",
      payload: { questionId: currentQuestion._id, optionId: option._id },
    });
    updateScore(option);
    setTimeout(() => {
      currentQuestionNumber === currentQuiz?.questions.length
        ? navigate("/result", { replace: true })
        : dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
      dispatch({ type: "ENABLE_OPTION_CLICK" });
    }, 3000);
  };

  useEffect(() => {
    token &&
      (async function () {
        try {
          const response = await axios.get(`${API_URL}/quiz/${quizId}`);
          if (response.status === 200) {
            dispatch({
              type: "SET_CURRENT_QUIZ",
              payload: { currentQuiz: response.data.quiz },
            });
          }
        } catch (error) {
          console.log("Error getting quiz by Id from backend", error);
        }
      })();
    // return () => dispatch({ type: "RESET_QUIZ_STATE" });
  }, [dispatch, quizId, token]);
  return (
    <>
      {currentQuiz && !startQuiz && (
        <InstructionsModal setStartQuiz={setStartQuiz} />
      )}
      {currentQuiz && startQuiz && (
        <div className="flex flex-col items-center">
          <div className="flex justify-between text-base font-semibold w-3/4 mb-4">
            <h3 className="">{currentQuiz?.quizName}</h3>
            <div className="">Score: {score}</div>
          </div>
          <div className="p-2 mb-4 text-lg">
            Question {currentQuestionNumber} :
            <span className="pl-3">{currentQuestion?.question}</span>
          </div>
          {currentQuestion?.options.map((option) => (
            <button
              disabled={isOptionClickDisabled}
              className={`block bg-gray-300 w-3/4 border-4 border-white p-3 ${
                isOptionClickDisabled && option.isRight && "bg-green-500"
              } ${
                option._id === selectedOptionId &&
                isOptionClickDisabled &&
                !option.isRight &&
                "bg-red-500"
              }`}
              onClick={() => optionClickHandler(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
