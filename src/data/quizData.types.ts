export type Option = {
  id: string;
  text: string;
  isRight: boolean;
};

export type Question = {
  id: string;
  question: string;
  points: number;
  negativePoint?: number;
  options: Option[];
  selectedOptionId?: string | null;
};

export type Quiz = {
  id: string;
  quizName: string;
  playTime: string;
  questions: Question[];
};
