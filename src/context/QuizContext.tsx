import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";
import { Action, InitialState, QuizContextType } from "./QuizContext.types";

const initialState: InitialState = {
  currentQuestionNumber: 1,
  score: 0,
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

    default:
      return state;
  }
};

export const QuizProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
