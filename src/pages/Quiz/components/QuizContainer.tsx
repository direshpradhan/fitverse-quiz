import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuiz } from "../../../context/quiz/QuizContext";
import { Option, Question } from "../../../data/quizData.types";

export const QuizContainer = () => {
  const navigate = useNavigate();
  const {
    state: { score, currentQuestionNumber, isOptionClickDisabled, currentQuiz },
    dispatch,
  } = useQuiz();
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
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
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 w-11/12 md:w-2/3 lg:w-1/2 mx-auto">
        <h3 className="text-xl font-bold mb-8">{currentQuiz?.quizName}</h3>
        <div className="flex justify-between text-base font-semibold w-full mb-6">
          <div className="p-2 text-lg font-semibold">
            <span className="text-gray-700 pr-1">Question:</span>{" "}
            {currentQuestionNumber}/5
          </div>
          <div className="text-lg font-semibold p-2">
            <span className="text-gray-700 pr-1">Score:</span> {score}
          </div>
        </div>
        <div className="pl-2 self-start text-lg font-medium mb-4">
          {currentQuestion?.question}
        </div>
        {currentQuestion?.options.map((option) => (
          <button
            disabled={isOptionClickDisabled}
            className={`block bg-gray-300 my-2 rounded-xl w-full p-3 font-medium ${
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
    </>
  );
};
