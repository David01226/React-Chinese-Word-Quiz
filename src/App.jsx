import './App.css'
import Header from './components/Header'
import QuestionPage from './components/QuestionPage'
import Footer from './components/Footer'
import StartMenu from './components/StartMenu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import { questions } from './Questions'

function App() {

  // state variables
    const [userAnswer, setUserAnswer] = useState('');
    const [questionIndex, setQuestionIndex] = useState(Math.floor(Math.random() * 101));
    let currentQuestion = Object.keys(questions)[questionIndex].toUpperCase();
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [numOfAnsweredQuestions, setNumOfAnsweredQuestions] = useState(1);
    const [totalNumOfQuestions, setTotalNumOfQuestions] = useState(10)
    const allowedAttempts = 3


    // Resets all variables after game has finished or if exited
    const RestartQuizVariables = () => {
        setUserAnswer('');
        setQuestionIndex(Math.floor(Math.random() * 101))
        setCorrect(0);
        setIncorrect(0);
        setAttempts(0);
        setNumOfAnsweredQuestions(1);
        setTotalNumOfQuestions(10);
    }


  // specifies how many questions to answer
  const ClickNumOfQuestions = (e) => {
    const stringTotalNumOfQuestions = e.target.value
    setTotalNumOfQuestions(+stringTotalNumOfQuestions)
  }


  // generates next random question
  const NextQuestion = () => {
      setQuestionIndex(Math.floor(Math.random() * 101))
      // setQuestionIndex(10)

  }
  

  // asigns users answer to the userAnser state
  const AnswerHnd = (e) => {
      const answer = e.target.value
      setUserAnswer(answer)
  }


  // function handler for checking user answer, adding up score and monitoring number of attempts
  const CheckClickHnd = () => {
      const correctAnswer = Object.values(questions)[questionIndex]


      if (numOfAnsweredQuestions < totalNumOfQuestions) {

          // if correct
          if (userAnswer === correctAnswer) {
              setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
              setCorrect(correct + 1) // Add 1 to number of correct
              setAttempts(0) // Reset attempts back to 0 before next question
              NextQuestion() // Next Question
              setUserAnswer('')
          } 

          // if incorrect and not empty
          else if (userAnswer !== correctAnswer && userAnswer !== ''){
              if (attempts < allowedAttempts) {
                  setAttempts(attempts + 1) // Add one to the number of attempts if attempts is less than 3
                  
                                     
              } else if (attempts === allowedAttempts) {
                  setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
                  NextQuestion() // Next Questions
                  setAttempts(0) // reset the attempts back to 0 for next question
                  setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                  setUserAnswer('')
                  
              }
          } 
      
          // if no answer
              else {
              console.log('enter answer')
          }   

          

      } 
      


      else if (numOfAnsweredQuestions === totalNumOfQuestions) {
          if (userAnswer === correctAnswer) {
              setCorrect(correct + 1)
          } else if (userAnswer !== correctAnswer) {
              if (attempts < allowedAttempts) {
                  setAttempts(attempts + 1)
                                     
              } else if (attempts === allowedAttempts) {
                  setIncorrect(incorrect + 1)
                  setAttempts(0)
              }
          }
          
      } else return console.log('error')


      if (correct + incorrect === totalNumOfQuestions) {
          const question = document.querySelector(".question")
          question.style.display = "none"
      }

  }

  return (
    <Router>
        <div className="app-container">
            <Header 
            numOfAnsweredQuestions={numOfAnsweredQuestions}
            totalNumOfQuestions={totalNumOfQuestions}
            RestartQuizVariables={RestartQuizVariables}
            />

            <Switch>
              <Route exact path='/'>
                  <StartMenu ClickNumOfQuestions={ClickNumOfQuestions}/>
              </Route>
              <Route path='/quiz'>
                  <QuestionPage 
                  userAnswer={userAnswer}
                  questionIndex={questionIndex}
                  correct={correct}
                  incorrect={incorrect}
                  attempts={attempts}
                  numOfAnsweredQuestions={numOfAnsweredQuestions}
                  totalNumOfQuestions={totalNumOfQuestions}
                  allowedAttempts={allowedAttempts}
                  currentQuestion={currentQuestion}
                  AnswerHnd={AnswerHnd}
                  CheckClickHnd={CheckClickHnd}
                  />
              </Route>
            </Switch>
            
            <Footer RestartQuizVariables={RestartQuizVariables}/>
        </div>
    </Router>
    
  )
}

export default App
