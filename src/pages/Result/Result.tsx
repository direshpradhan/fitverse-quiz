import { useQuiz } from "../../context/quiz/QuizContext";

export const Result = () => {
  const {
    state: { score, currentQuiz },
    // dispatch,
  } = useQuiz();
  const totalPoints = currentQuiz?.questions.reduce(
    (total, question) => total + question.points,
    0
  ) as number;
  return (
    <div className="w-2/3 mx-auto">
      <div className="text-center font-bold text-2xl">Result</div>
      <div>
        <h2 className="font-bold text-lg text-center">
          Final Score: {score}/{totalPoints}
        </h2>
        {currentQuiz?.questions.map((question) => (
          <div className="my-8 ">
            <div>{question.question}</div>
            {question.options.map((option) => (
              <div
                className={`block bg-gray-300 border-4 border-white p-3 ${
                  option.isRight && "bg-green-500"
                } ${
                  option._id === question.selectedOptionId &&
                  !option.isRight &&
                  "bg-red-500"
                }`}
              >
                {option.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
