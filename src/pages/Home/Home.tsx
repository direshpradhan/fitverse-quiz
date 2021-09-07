import { useEffect } from "react";
import { Loader } from "../../components/Loader";
import { useQuiz } from "../../context/quiz/QuizContext";
import { QuizCard } from "./components/QuizCard";

export const Home = () => {
  const {
    state: { allQuizzes },
    dispatch,
  } = useQuiz();

  console.log(allQuizzes);

  useEffect(() => {
    dispatch({ type: "RESET_QUIZ_STATE" });
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-12 mx-auto w-11/12 md:w-screen md:flex-row items-center md:justify-center py-8 md:py-10">
        {allQuizzes ? (
          allQuizzes?.map((quiz) => {
            return <QuizCard key={quiz._id} quiz={quiz} />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
