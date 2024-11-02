import React, { createContext, useEffect, useState } from 'react'

export const QuizContext = createContext(null);

const QuizContextProvider = (props) => {

  const [words, setWords] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * 100))
  const [totalWords, setTotalWords] = useState(0)

  const fetchWords = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/words');
        if (response.ok) {
            const data = await response.json();
            setWords(data[0].words); // Set words in state
            setCurrentQuestion(Object.keys(data[0].words)[randomIndex])
            setCorrectAnswer(Object.values(data[0].words)[randomIndex])
            setTotalWords(Object.keys(data[0].words).length)
        } else {
            console.error("Failed to fetch data:", response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

useEffect(() => {
    fetchWords()
}, [])

  const contextValue = {words, currentQuestion, correctAnswer, totalWords, setCurrentQuestion, setCorrectAnswer, setRandomIndex}

  return (
    <QuizContext.Provider value={contextValue}>
      {props.children}
    </QuizContext.Provider>
  )

}

export default QuizContextProvider