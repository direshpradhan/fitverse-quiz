import { useEffect, useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import { quizData } from "../../data/quizData";
import { Option, Question } from "../../data/quizData.types";

export const Quiz = () => {
  const {
    state: { score, currentQuestionNumber, isOptionClickDisabled, currentQuiz },
    dispatch,
  } = useQuiz();
  const [selectedOptionId, setSelectedOptionId] = useState("");
  //   const [rightAnswerBg, setRightAnswerBg] = useState("");
  //   const [wrongAnswerBg, setWrongAnswerBg] = useState("");
  const currentQuestion = currentQuiz?.questions[
    currentQuestionNumber - 1
  ] as Question;
  console.log(isOptionClickDisabled);

  const rightAnswerHandler = (option: Option) => {
    setSelectedOptionId(option.id);
    // setRightAnswerBg("green");
    // setWrongAnswerBg("red");
    dispatch({ type: "DISABLE_OPTION_CLICK" });
    dispatch({
      type: "SET_SELECTED_OPTION",
      payload: { questionId: currentQuestion.id, optionId: option.id },
    });
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
            score: currentQuestion?.negativePoint,
          },
        });
    setTimeout(() => {
      currentQuestionNumber < quizData.questions.length &&
        dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
      dispatch({ type: "ENABLE_OPTION_CLICK" });
    }, 3000);
  };

  useEffect(() => {
    console.log("useEffect..");
    dispatch({ type: "SET_CURRENT_QUIZ", payload: { quizId: quizData.id } });
    return () => {};
  }, [dispatch]);
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="flex justify-between text-base font-semibold w-3/4 mb-4">
          <h3 className="">{quizData.quizName}</h3>
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
              option.id === selectedOptionId &&
              isOptionClickDisabled &&
              !option.isRight &&
              "bg-red-500"
            }`}
            onClick={() => rightAnswerHandler(option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};
