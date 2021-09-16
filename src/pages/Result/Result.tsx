import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";
import { useQuiz } from "../../context/quiz/QuizContext";

export const Result = () => {
  const {
    state: { score, currentQuiz },
    // dispatch,
  } = useQuiz();
  const { token } = useAuth();
  const navigate = useNavigate();
  // const totalPoints = currentQuiz?.questions.reduce(
  //   (total, question) => total + question.points,
  //   0
  // ) as number;

  useEffect(() => {
    !token && navigate("/login");
  }, [token, navigate]);

  return (
    <div className="w-11/12 md:w-2/3 lg:w-1/2 mx-auto my-8">
      <div className="text-center font-semibold text-2xl mb-4">Result</div>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-xl text-center">
          <span className="text-gray-700 pr-1">Final Score:</span> {score}/
          {currentQuiz?.totalPoints}
        </h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 mb-2 hover:opacity-90"
          onClick={() => navigate("/")}
        >
          Take another quiz
        </button>
        {currentQuiz?.questions.map((question) => (
          <div className="mt-8 w-full">
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
