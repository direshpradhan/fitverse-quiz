import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";
import { quizData } from "../data/quizData";
import { Quiz } from "../data/quizData.types";
import { Action, InitialState, QuizContextType } from "./QuizContext.types";

const initialState: InitialState = {
  currentQuestionNumber: 1,
  score: 0,
  currentQuiz: null,
  isOptionClickDisabled: false,
};

const QuizContext = createContext<QuizContextType>({
  state: initialState,
  dispatch: () => null,
});

const quizReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "INCREMENT_SCORE":
      console.log("Score.....");
      return { ...state, score: state.score + action.payload.score };

    case "INCREMENT_QUESTION_NUMBER":
      return {
        ...state,
        currentQuestionNumber: state.currentQuestionNumber + 1,
      };

    case "SET_CURRENT_QUIZ":
      console.log("entered");
      console.log(quizData.id);
      console.log(action.payload.quizId);
      if (quizData.id === action.payload.quizId) {
        const selectedQuiz = quizData;
        console.log(selectedQuiz);
        return { ...state, currentQuiz: selectedQuiz };
      }
      return state;

    case "SET_SELECTED_OPTION":
      const { questionId, optionId } = action.payload;
      return {
        ...state,
        currentQuiz: {
          ...state.currentQuiz,
          questions: state.currentQuiz?.questions.map((question) => {
            return question.id === questionId
              ? { ...question, selectedOptionId: optionId }
              : question;
          }),
        } as Quiz,
      };

    case "DISABLE_OPTION_CLICK":
      return { ...state, isOptionClickDisabled: true };

    case "ENABLE_OPTION_CLICK":
      console.log("enabling...");
      return { ...state, isOptionClickDisabled: false };

    default:
      return state;
  }
};

export const QuizProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
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
