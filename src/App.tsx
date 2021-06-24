import "./App.css";
import { Quiz } from "./pages/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <h1 className="font-bold text-3xl mt-4 mb-8 text-center">
        Quiz Master!!
      </h1>
      {/* <Quiz /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
