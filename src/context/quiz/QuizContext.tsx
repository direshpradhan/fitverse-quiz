import axios from "axios";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { isNumber } from "util";
// import { quizData } from "../../data/quizData";
import { Quiz } from "../../data/quizData.types";
import { API_URL } from "../../utils/constants";
import { Action, InitialState, QuizContextType } from "./QuizContext.types";

const initialState: InitialState = {
  allQuizzes: null,
  currentQuestionNumber: 1,
  score: 0,
  currentQuiz: null,
  isOptionClickDisabled: false,
};

const QuizContext = createContext<QuizContextType>({
  state: initialState,
  dispatch: () => null,
});

const quizReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "INITIALIZE_ALL_QUIZZES":
      console.log(action.payload);
      return { ...state, allQuizzes: action.payload };

    case "INCREMENT_SCORE":
      console.log("Score.....");
      console.log(action.payload);
      return { ...state, score: state.score + action.payload.score };

    case "DECREMENT_SCORE":
      if (isNumber(action.payload.score)) {
        return { ...state, score: state.score - action.payload.score };
      }
      return state;

    case "INCREMENT_QUESTION_NUMBER":
      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber + 1,
      };

    case "SET_CURRENT_QUIZ":
      const selectedQuiz = state.allQuizzes?.find(
        (quiz) => quiz._id === action.payload.quizId
      ) as Quiz;

      selectedQuiz.questions.forEach(
        (question) => (question.selectedOptionId = null)
      );
      return { ...state, currentQuiz: selectedQuiz };

    case "SET_SELECTED_OPTION":
      console.log("option....");
      const { questionId, optionId } = action.payload;
      console.log(questionId);
      const res = {
        ...state,
        currentQuiz: {
          ...state.currentQuiz,
          questions: state.currentQuiz?.questions.map((question) => {
            console.log(question._id);
            return question._id === questionId
              ? { ...question, selectedOptionId: optionId }
              : question;
          }),
        } as Quiz,
      };
      console.log(res);
      return res;

    case "DISABLE_OPTION_CLICK":
      return { ...state, isOptionClickDisabled: true };

    case "ENABLE_OPTION_CLICK":
      return { ...state, isOptionClickDisabled: false };

    case "RESET_QUIZ_STATE":
      return { ...initialState, allQuizzes: state.allQuizzes };

    default:
      return state;
  }
};

export const QuizProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${API_URL}/quiz`);
        if (response.status === 200) {
          dispatch({
            type: "INITIALIZE_ALL_QUIZZES",
            payload: response.data.quizzes,
          });
        }
      } catch (error) {
        console.log("Error while getting data from backend...", error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: "INITIALIZE_ALL_QUIZZES",
  //     payload: { allQuizzes: quizData },
  //   });
  // }, []);
  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
