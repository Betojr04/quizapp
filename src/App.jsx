import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    fname: "",
    dropdown1: "",
    dropdown2: ""
  });
  const [errors, setErrors] = useState({});

  const [currentStep, setCurrentStep] = useState("home");
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fname.trim()) errors.name = "Name is required";
    if (!formData.dropdown1 || formData.dropdown1 === "default") {
      errors.dropdown1 = "Please select an option from Dropdown 1.";
    }
    if (!formData.dropdown2 || formData.dropdown2 === "default") {
      errors.dropdown2 = "Please select an option from Dropdown 2.";
    }
    return errors;
  };

  const fetchQuestion = async () => {
    const url = `https://opentdb.com/api.php?amount=1&category=${formData.dropdown1}&difficulty=${formData.dropdown2}&type=multiple`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.response_code === 0) {
        const question = data.results[0];
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer
        ];
        setQuestionData({
          ...question,
          answers: answers.sort(() => Math.random() - 0.5)
        });
        setCurrentStep("question");
      } else {
        console.error("No questions available");
      }
    } catch (error) {
      console.error("Error fetching question", error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      fetchQuestion();
    }
  };

  return (
    <main className="app-container">
      {currentStep === "home" &&
        <section>
          <form onSubmit={handleSubmit} className="app-form">
            <fieldset>
              <legend>Quiz Setup</legend>
              <div>
                <label htmlFor="fname">First Name:</label>
                <input
                  value={formData.fname}
                  onChange={handleInputChange}
                  name="fname"
                  id="fname"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="dropdown1">Choose a Category:</label>
                <select
                  value={formData.dropdown1}
                  onChange={handleInputChange}
                  name="dropdown1"
                  id="dropdown1"
                >
                  <option value="">Select your Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="21">Sports</option>
                  <option value="23">History</option>
                  <option value="17">Science</option>
                </select>
              </div>
              <div>
                <label htmlFor="dropdown2">Select Difficulty:</label>
                <select
                  value={formData.dropdown2}
                  onChange={handleInputChange}
                  name="dropdown2"
                  id="dropdown2"
                >
                  <option value="">Select your Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </section>}

      {currentStep === "question" &&
        questionData &&
        <section>
          <h2>
            {questionData.question}
          </h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!selectedAnswer) {
                alert("Please select an answer!");
                return;
              }
              const isCorrect = selectedAnswer === questionData.correct_answer;
              setResult({
                isCorrect,
                correctAnswer: questionData.correct_answer
              });
              setCurrentStep("result");
            }}
          >
            {questionData.answers.map((answer, index) =>
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={answer}
                    onChange={() => setSelectedAnswer(answer)}
                  />
                  {answer}
                </label>
              </div>
            )}
            <button type="submit">Submit Answer</button>
          </form>
        </section>}

      {currentStep === "result" &&
        result &&
        <section>
          <h2>Results</h2>
          {result.isCorrect
            ? <p>
                Congratulations, {formData.fname}! You got it right! 🎉
              </p>
            : <p>
                Sorry, {formData.fname}. The correct answer was:{" "}
                {result.correctAnswer}.
              </p>}
          <button onClick={() => setCurrentStep("home")}>Start Over</button>
        </section>}
    </main>
  );
};

export default App;
