import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers?.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
      fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then(() => onDeleteQuestion(question));
  };

  function handleUpdate(event) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": event.target.value
      })
    })
      .then((r) => r.json())
      .then(() => onUpdateQuestion(question))

  }
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
