import { useQuiz } from "../../context/quiz/QuizContext";

export const Result = () => {
  const {
    state: { score, currentQuiz },
    // dispatch,
  } = useQuiz();
  // const totalPoints = currentQuiz?.questions.reduce(
  //   (total, question) => total + question.points,
  //   0
  // ) as number;

  return (
    <div className="w-11/12 md:w-2/3 lg:w-1/2 mx-auto my-8">
      <div className="text-center font-semibold text-2xl mb-4">Result</div>
      <div>
        <h2 className="font-semibold text-xl text-center">
          <span className="text-gray-700 pr-1">Final Score:</span> {score}/
          {currentQuiz?.totalPoints}
        </h2>
        {currentQuiz?.questions.map((question) => (
          <div className="my-14">
            <div className="self-start text-lg font-medium mb-4 pl-2">
              {question.question}
            </div>
            {question.options.map((option) => (
              <div
                className={`block bg-gray-300 my-2 rounded-xl p-3 ${
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
