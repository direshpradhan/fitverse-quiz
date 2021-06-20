export type InitialState = {
  currentQuestionNumber: number;
  score: number;
};

export type QuizContextType = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};

export type Action =
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "INCREMENT_QUESTION_NUMBER" };
