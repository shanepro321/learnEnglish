"use client";
import React from "react";
import ReactDOM from "react-dom";

function MainComponent() {
  const [questionBank, setQuestionBank] = React.useState([]);
  const [chineseWord, setChineseWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");
  const [testStarted, setTestStarted] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  const addWord = (e) => {
    e.preventDefault();
    const newEntry = { chinese: chineseWord, english: englishWord };
    setQuestionBank([...questionBank, newEntry]);
    setChineseWord("");
    setEnglishWord("");
  };

  const startTest = () => {
    if (questionBank.length < 4) {
      alert("Please add at least 4 words to start the test.");
      return;
    }
    setTestStarted(true);
    generateQuestion();
  };

  const generateQuestion = () => {
    const randomEntry =
      questionBank[Math.floor(Math.random() * questionBank.length)];
    const incorrectOptions = questionBank.filter((q) => q !== randomEntry);
    const randomOptions = incorrectOptions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allOptions = [...randomOptions, randomEntry].sort(
      () => 0.5 - Math.random()
    );

    setCurrentQuestion(randomEntry);
    setOptions(allOptions);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-roboto mb-4">Learn Words</h1>

      <div className="w-full max-w-lg">
        <h2 className="text-xl font-roboto mb-2">Create Question Bank</h2>

        <form className="mb-8" onSubmit={addWord}>
          <input
            value={chineseWord}
            onChange={(e) => setChineseWord(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Chinese Word"
          />
          <input
            value={englishWord}
            onChange={(e) => setEnglishWord(e.target.value)}
            type="text"
            className="form-input"
            placeholder="English Translation"
          />
          <button
            type="submit"
            className="button"
          >
            Add Word
          </button>
        </form>

        <h2 className="text-xl font-roboto mb-2">Start Test</h2>
        <button
          onClick={startTest}
          disabled={questionBank.length < 4}
          className={`button ${questionBank.length < 4 ? 'disabled' : ''}`}
        >
          Start
        </button>

        {testStarted && (
          <div className="question-container">
            <h3 className="question">
              Translate the following word:
            </h3>
            <p className="question">
              {currentQuestion?.chinese}
            </p>

            <div className="options-container">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                >
                  {option.english}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<MainComponent />, document.getElementById('root'));
