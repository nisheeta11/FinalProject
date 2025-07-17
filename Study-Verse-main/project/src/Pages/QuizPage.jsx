import React, { useState } from 'react';
import quizData from '../Data/quizData';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const QuizPage = () => {
  const categories = Object.keys(quizData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = quizData[selectedCategory];

  const handleSelectOption = (qIndex, option) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: option });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    return questions.reduce((score, q, i) => {
      return answers[i] === q.answer ? score + 1 : score;
    }, 0);
  };

  return (
    <>
      <main className="quiz-container">
        <header>
          <h2 className="quiz-title">Take a Quiz</h2>
        </header>

        <nav className="quiz-category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`quiz-category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </nav>

        <section className="quiz-content">
          {questions.map((q, index) => (
            <article className="quiz-question-section" key={index}>
              <h4 className="quiz-question">
                {index + 1}. {q.question}
              </h4>
              <div className="quiz-options">
                {q.options.map((option, i) => {
                  const selected = answers[index] === option;
                  const correct = q.answer === option;
                  let className = 'quiz-option';
                  let icon = null;

                  if (submitted) {
                    if (selected && correct) {
                      className += ' correct';
                      icon = <FaCheckCircle color="#28a745" />;
                    } else if (selected && !correct) {
                      className += ' wrong';
                      icon = <FaTimesCircle color="#dc3545" />;
                    } else if (!selected && correct) {
                      className += ' correct';
                      icon = <FaCheckCircle color="#28a745" />;
                    }
                  } else {
                    if (selected && correct) {
                      className += ' correct';
                      icon = <FaCheckCircle color="#28a745" />;
                    } else if (selected && !correct) {
                      className += ' wrong';
                      icon = <FaTimesCircle color="#dc3545" />;
                    }
                  }

                  return (
                    <button
                      key={i}
                      className={className}
                      onClick={() => handleSelectOption(index, option)}
                      disabled={submitted}
                    >
                      {option} <span className="quiz-icon">{icon}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}

          {!submitted ? (
            <button
              className="quiz-submit-btn"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Quiz
            </button>
          ) : (
            <div className="quiz-score">
              <h3>You scored {calculateScore()} out of {questions.length}</h3>
              <button onClick={() => handleCategoryChange(selectedCategory)}>Retake Quiz</button>
            </div>
          )}
        </section>
      </main>

      <style>{`
        .quiz-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 2rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', sans-serif;
        }

        .quiz-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .quiz-category-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .quiz-category-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 20px;
          background-color: #e0e0e0;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .quiz-category-btn.active {
          background-color: #4caf50;
          color: white;
          font-weight: bold;
        }

        .quiz-question-section {
          margin-bottom: 2rem;
        }

        .quiz-question {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .quiz-option {
          padding: 12px 16px;
          border: 1px solid #ccc;
          border-radius: 10px;
          background-color: #f9f9f9;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quiz-option:hover:not(:disabled) {
          background-color: #e6f7ff;
        }

        .quiz-option.correct {
          background-color: #d4edda;
          border-color: #28a745;
          color: #155724;
        }

        .quiz-option.wrong {
          background-color: #f8d7da;
          border-color: #dc3545;
          color: #721c24;
        }

        .quiz-icon {
          margin-left: 8px;
          font-size: 1.3rem;
        }

        .quiz-submit-btn {
          padding: 12px 24px;
          background-color: #2196f3;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          display: block;
          margin: 20px auto 0;
        }

        .quiz-submit-btn:disabled {
          background-color: #bdbdbd;
          cursor: not-allowed;
        }

        .quiz-score {
          text-align: center;
          margin-top: 2rem;
          font-size: 1.3rem;
        }

        .quiz-score button {
          margin-top: 1rem;
          padding: 10px 20px;
          border: none;
          background-color: #4caf50;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default QuizPage;
