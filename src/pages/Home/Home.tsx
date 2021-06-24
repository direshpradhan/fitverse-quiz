import { Link } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

export const Home = () => {
  const {
    state: { allQuizzes },
  } = useQuiz();
  return (
    <div className="border border-black max-w-max p-4 ml-8">
      {allQuizzes?.map((quiz) => {
        return (
          <Link to={`/quiz/${quiz.id}`}>
            <div className="b-px">
              <h2 className="text-lg font-bold">{quiz.quizName}</h2>
              <div>Test Yourself by taking this Quiz!!</div>
              <div>{quiz.questions.length} Questions</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
