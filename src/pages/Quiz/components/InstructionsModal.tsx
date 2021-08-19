import React, { SetStateAction } from "react";
import { useQuiz } from "../../../context/quiz/QuizContext";

export const InstructionsModal = ({
  setStartQuiz,
}: {
  setStartQuiz: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    state: { currentQuiz },
  } = useQuiz();
  return (
    <div className=" mx-auto mt-28 md:mt-24 w-96">
      <div className=" pt-6 pb-12 rounded-xl shadow-2xl flex flex-col items-center bg-white">
        <h2 className="font-bold mb-2 text-2xl">Instructions</h2>
        <div className="text-lg">
          <p className="flex items-center my-3 text-gray-600 font-medium">
            <span className="material-icons-outlined mr-2">info</span> This quiz
            contains {currentQuiz?.totalQuestions} questions in total.
          </p>
          <p className="flex items-center my-3 text-gray-600 font-medium">
            <span className="material-icons-outlined mr-2">info</span> 5 marks
            for every correct answer.
          </p>
          <p className="flex items-center my-3 text-gray-600 font-medium">
            <span className="material-icons-outlined mr-2">info</span> No
            negative marking.
          </p>
          <p className="flex items-center my-3 text-gray-600 font-medium">
            <span className="material-icons-outlined mr-2">info</span> No SKIP
            option!!
          </p>
        </div>
        <button
          className="px-3 py-2 mt-3 bg-blue-700 text-white font-medium rounded"
          onClick={() => setStartQuiz(() => true)}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};
