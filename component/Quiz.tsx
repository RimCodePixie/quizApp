"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching questions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
      }, 1000); // Delay for a second before going to the next question
    } else {
      setFinished(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (finished) {
    return <div>Your score is: {score} out of {questions.length}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <div>
      <div >
        <h2>Score: {score}</h2>
      </div>
      <div >
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      </div>
      <div >
        <h3 className='App1'>{currentQuestion.question}</h3>
      </div>
      {options.map((option, index) => {
        const buttonClass = selectedAnswer === option 
          ? (option === currentQuestion.correct_answer ? 'button correct' : 'button incorrect')
          : 'button';

        return (
          <button className={`${buttonClass} ans_option`} key={index} onClick={() => handleAnswer(option)}>
            <div className='options'>{option}</div>
          </button>
        );
      })}
    </div>
  );
};

export default Quiz;
