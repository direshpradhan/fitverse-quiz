import { isNumber } from "util";
import { Action, InitialState } from "./../context/quiz/QuizContext.types";
import { Quiz } from "../data/quizData.types";

export const initialState: InitialState = {
  allQuizzes: null,
  currentQuestionNumber: 1,
  score: 0,
  currentQuiz: null,
  isOptionClickDisabled: false,
};

export const quizReducer = (
  state: InitialState,
  action: Action
): InitialState => {
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
      action.payload.currentQuiz.questions.forEach(
        (question) => (question.selectedOptionId = null)
      );
      return { ...state, currentQuiz: action.payload.currentQuiz };

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
