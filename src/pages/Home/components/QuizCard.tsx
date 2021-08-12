import React from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../../../data/quizData.types";

export const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  return (
    <>
      <Link to={`/quiz/${quiz._id}`}>
        <div className=" rounded-xl shadow-2xl w-80 md:w-96 h-full bg-white">
          <div className="h-60">
            <img
              src={quiz.imageUrl}
              alt="Quiz Poster"
              className="w-full rounded-xl h-full"
            />
          </div>
          <div className="h-40 pt-3 pl-3 flex flex-col">
            <h2 className="text-xl font-bold">{quiz.quizName}</h2>
            <div className="pt-1 text-gray-600 font-medium">
              {quiz.description}
            </div>
            <div className="pt-1 text-gray-600 font-medium">
              {quiz.questions.length} Questions
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
