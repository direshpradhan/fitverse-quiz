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
      <h3>{quizData.quizName}</h3>
      <div>Score: {score}</div>
      <div>Question No.:{currentQuestionNumber}</div>
      <div>{currentQuestion?.question}</div>
      {currentQuestion?.options.map((option) => (
        <button
          //   style={{
          //     backgroundColor: option.isRight ? rightAnswerBg : wrongAnswerBg,
          //   }}
          disabled={isOptionClickDisabled}
          className={`block bg-gray-300 w-full ${
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
  );
};
