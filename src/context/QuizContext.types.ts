import { Quiz } from "../data/quizData.types";

export type InitialState = {
  allQuizzes: Array<Quiz> | null;
  currentQuestionNumber: number;
  score: number;
  currentQuiz: Quiz | null;
  isOptionClickDisabled: boolean;
};

export type QuizContextType = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};

export type Action =
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "INCREMENT_QUESTION_NUMBER" }
  | {
      type: "SET_SELECTED_OPTION";
      payload: { questionId: string; optionId: string };
    }
  | { type: "DISABLE_OPTION_CLICK" }
  | { type: "ENABLE_OPTION_CLICK" }
  | { type: "SET_CURRENT_QUIZ"; payload: { quizId: string } }
  | { type: "INITIALIZE_ALL_QUIZZES"; payload: { allQuizzes: Array<Quiz> } };
