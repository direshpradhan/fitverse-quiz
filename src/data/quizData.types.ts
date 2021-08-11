export type Option = {
  _id: string;
  text: string;
  isRight: boolean;
};

export type Question = {
  _id: string;
  question: string;
  points: number;
  negativePoint?: number;
  options: Option[];
  selectedOptionId?: string | null;
};

export type Quiz = {
  _id: string;
  quizName: string;
  playTime: string;
  totalPoints: number;
  totalQuestions: number;
  description: string;
  imageUrl: string;
  questions: Question[];
};
