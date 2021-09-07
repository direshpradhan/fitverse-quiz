import axios from "axios";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { initialState, quizReducer } from "../../reducer/QuizReducer";
import { API_URL } from "../../utils/constants";
import { useAuth } from "../auth/AuthContext";
import { QuizContextType } from "./QuizContext.types";

const QuizContext = createContext<QuizContextType>({
  state: initialState,
  dispatch: () => null,
});

export const QuizProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { token } = useAuth();
  console.log("entered quiz context");
  useEffect(() => {
    token &&
      (async function () {
        console.log("entered quiz context useeffect....");
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
  }, [token]);

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
