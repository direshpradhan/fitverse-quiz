import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";
import { useQuiz } from "../../context/quiz/QuizContext";
// import { Option, Question } from "../../data/quizData.types";
import { API_URL } from "../../utils/constants";
import { InstructionsModal } from "./components/InstructionsModal";
import { QuizContainer } from "./components/QuizContainer";

export const Quiz = () => {
  const { quizId } = useParams();
  const { token } = useAuth();
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const {
    state: { currentQuiz },
    dispatch,
  } = useQuiz();

  useEffect(() => {
    token &&
      (async function () {
        try {
          const response = await axios.get(`${API_URL}/quiz/${quizId}`);
          if (response.status === 200) {
            dispatch({
              type: "SET_CURRENT_QUIZ",
              payload: { currentQuiz: response.data.quiz },
            });
          }
        } catch (error) {
          console.log("Error getting quiz by Id from backend", error);
        }
      })();
    // return () => dispatch({ type: "RESET_QUIZ_STATE" });
  }, [dispatch, quizId, token]);

  return (
    <>
      {!currentQuiz && (
        <h2 className="text-center text-2xl font-semibold flex items-center justify-center my-40">
          Loading....
        </h2>
      )}
      {currentQuiz && !startQuiz && (
        <InstructionsModal setStartQuiz={setStartQuiz} />
      )}
      {currentQuiz && startQuiz && <QuizContainer />}
    </>
  );
};
