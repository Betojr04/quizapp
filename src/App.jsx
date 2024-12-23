import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    fname: "",
    dropdown1: "",
    dropdown2: ""
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = e => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      setErrors({});
      console.log("Form is valid! Data:", formData);
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Welcome To the quiz app</h1>
      </header>

      <section>
        <form
          onSubmit={handleSubmit}
          role="form"
          className="app-form"
          type="submit"
        >
          <fieldset>
            <legend>Qizz Setup</legend>

            {/* space */}
            <div>
              <label htmlFor="fname">First Name:</label>
              <input
                value={formData.fname}
                onChange={handleInputChange}
                name="fname"
                id="fname"
                type="text"
                required
                placeholder="first name"
              />
            </div>
            {/* space */}
            <div>
              <label htmlFor="dropdown1">Choose a Category:</label>

              <select
                value={formData.dropdown1}
                onChange={handleInputChange}
                name="dropdown1"
                id="dropdown1"
                required
              >
                <option value="">Select your Category</option>
                <option value="knowledge">General Knowledge</option>
                <option value="sports">Sports</option>
                <option value="history">History</option>
                <option value="science">Science</option>
              </select>
            </div>
            {/* space */}
            <div>
              <label htmlFor="dropdown2">Select Difficulty:</label>
              <select
                value={formData.dropdown2}
                onChange={handleInputChange}
                name="dropdown2"
                id="dropdown2"
                required
              >
                <option value="">Select your Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <button className="submit-button" type="submit">
              Submit
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default App;
