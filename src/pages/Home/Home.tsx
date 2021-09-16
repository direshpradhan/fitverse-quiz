import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader } from "../../components/Loader";
import { useAuth } from "../../context/auth/AuthContext";
import { useQuiz } from "../../context/quiz/QuizContext";
import { QuizCard } from "./components/QuizCard";

export const Home = () => {
  const {
    state: { allQuizzes },
    dispatch,
  } = useQuiz();
  const { token } = useAuth();
  const navigate = useNavigate();

  console.log(allQuizzes);

  useEffect(() => {
    dispatch({ type: "RESET_QUIZ_STATE" });
    !token && navigate("/login");
  }, [dispatch, token, navigate]);

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
