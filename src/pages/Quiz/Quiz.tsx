import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Loader } from "../../components/Loader";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
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
    } else {
      navigate("/login");
    }
    // return () => dispatch({ type: "RESET_QUIZ_STATE" });
  }, [dispatch, quizId, token, navigate]);

  return (
    <>
      {!currentQuiz && <Loader />}
      {currentQuiz && !startQuiz && (
        <InstructionsModal setStartQuiz={setStartQuiz} />
      )}
      {currentQuiz && startQuiz && <QuizContainer />}
    </>
  );
};
