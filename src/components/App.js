import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((r) => r.json())
    .then((questions) => setQuestions(questions))
  }, [])


  function handleAddQuestion(newQuestion) {
  setQuestions([...questions, newQuestion])
  }

  function onDeleteQuestion(deletedQuestion) {
  const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
  setQuestions(updatedQuestions)
  }

function onUpdateQuestion(updatedQuestion) {
  const updatedQuestions = questions.map((question) => {
    if (question.id === updatedQuestion.id) {
      return updatedQuestion;
    } else {
      return question
    }
  }); 
  setQuestions(updatedQuestions)

}
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleAddQuestion={handleAddQuestion} /> : <QuestionList onDeleteQuestion={onDeleteQuestion} questions={questions} onUpdateQuestion={onUpdateQuestion}/>}
    </main>
  );
}

export default App;
