import { Quiz } from "./quizData.types";
import { v4 as uuid } from "uuid";

const quizData: Array<Quiz> = [
  {
    id: uuid(),
    quizName: "Marvel Cinematic Universe",
    playTime: "5 minutes",
    questions: [
      {
        id: uuid(),
        question:
          "How many avengers were there in first Avengers movie released in 2012?",
        points: 5,
        options: [
          {
            id: uuid(),
            text: "22",
            isRight: false,
          },
          {
            id: uuid(),
            text: "10",
            isRight: false,
          },
          {
            id: uuid(),
            text: "6",
            isRight: true,
          },
          {
            id: uuid(),
            text: "15",
            isRight: false,
          },
        ],
      },
      {
        id: uuid(),
        question:
          "What was Dr. Strange doing during the fight of New York in 2012?",
        points: 15,
        negativePoint: 3,
        options: [
          {
            id: uuid(),
            text: "getting trained as master of the mystic arts",
            isRight: false,
          },
          {
            id: uuid(),
            text: "performing surgery as a real doctor",
            isRight: true,
          },
        ],
      },
      {
        id: uuid(),
        question: "Who's the love interest for Wanda in MCU?",
        points: 5,
        options: [
          {
            id: uuid(),
            text: "Clint",
            isRight: false,
          },
          {
            id: uuid(),
            text: "Vision",
            isRight: true,
          },
        ],
      },
    ],
  },
];

// console.log(quizOne.questions[2].negativePoint);

export { quizData };
