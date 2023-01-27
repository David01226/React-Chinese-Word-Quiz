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
    const currentQuestion = Object.keys(questions)[questionIndex].toUpperCase();
    const correctAnswer = Object.values(questions)[questionIndex]
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


        let buttons = document.querySelectorAll('.startOptions')
        for (let i = 0, max = buttons.length; i < max; i++) {      // reset all buttons to original color before changing the selected to red
            buttons[i].style.backgroundColor = "#E6E6E6";
        }

        let attempts = document.getElementsByClassName('footer-center');
        for (let i = 0, max = attempts.length; i < max; i++) {      
            attempts[i].style.display = "none";
        }

        let progress = document.getElementsByClassName('header-center');
        for (let i = 0, max = progress.length; i < max; i++) {      
            progress[i].style.display = "none";
        }

        let questionNum = document.getElementsByClassName('header-right');
        for (let i = 0, max = questionNum.length; i < max; i++) {      
            questionNum[i].style.display = "none";
        }

        let startButton = document.getElementsByClassName('startBtn');
        for (let i = 0, max = startButton.length; i < max; i++) {      
            startButton[i].style.backgroundColor = "#E6E6E6";
            startButton[i].style.display = "block";
            startButton[i].style.opacity = "0.4";

        }

        let skipButton = document.getElementsByClassName('skipBtn');
        for (let i = 0, max = skipButton.length; i < max; i++) {      
            skipButton[i].style.display = "none";
        }

        let quitButton = document.getElementsByClassName('quitBtn');
        for (let i = 0, max = quitButton.length; i < max; i++) {      
            quitButton[i].style.opacity = "0.4";
        }
    }


  // specifies how many questions to answer
  const ClickNumOfQuestions = (e) => {
        const stringTotalNumOfQuestions = e.target.value
        setTotalNumOfQuestions(+stringTotalNumOfQuestions)  // Set total number of questions

        
        let buttons = document.querySelectorAll('.startOptions')
        for (let i = 0, max = buttons.length; i < max; i++) {      // reset all buttons to original color before changing the selected to red
            buttons[i].style.backgroundColor = "#E6E6E6";
        }
        let selectedButton = e.target
        selectedButton.style.backgroundColor = "#EE0F0F";


        let startButton = document.getElementsByClassName('startBtn');
        for (let i = 0, max = startButton.length; i < max; i++) {      
            startButton[i].style.backgroundColor = "#EE0F0F";
            startButton[i].style.opacity = "1";
        }
        
  }

  const StartClickHnd = () => {
    let attempts = document.getElementsByClassName('footer-center');   // This makes the user attempts visible
    for (let i = 0, max = attempts.length; i < max; i++) {      
        attempts[i].style.display = "flex";
    }


    let progress = document.getElementsByClassName('header-center');  // Make progress bar visible
    for (let i = 0, max = progress.length; i < max; i++) {      
        progress[i].style.display = "block";
    }

    let questionNum = document.getElementsByClassName('header-right');  // Make current question index visible
    for (let i = 0, max = questionNum.length; i < max; i++) {      
        questionNum[i].style.display = "block";
    }

    let startButton = document.getElementsByClassName('startBtn');
        for (let i = 0, max = startButton.length; i < max; i++) {      
            startButton[i].style.display = "none";
        }

    let skipButton = document.getElementsByClassName('skipBtn');
    for (let i = 0, max = skipButton.length; i < max; i++) {      
        skipButton[i].style.display = "block";
    }

    let quitButton = document.getElementsByClassName('quitBtn');
        for (let i = 0, max = quitButton.length; i < max; i++) {      
            quitButton[i].style.opacity = "1";
        }
  }



  // generates next random question
  const NextQuestion = () => {
      setQuestionIndex(Math.floor(Math.random() * 101))
  }


  const SkipQuestion = () => {
    setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
    NextQuestion() // Next Questions
    setAttempts(0) // reset the attempts back to 0 for next question
    setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
    setUserAnswer('')
  }
  

  // asigns users answer to the userAnser state
  const AnswerHnd = (e) => {
      const answer = e.target.value
      setUserAnswer(answer)
  }



  // function handler for checking user answer, adding up score and monitoring number of attempts
  const CheckClickHnd = () => {
    //   const correctAnswer = Object.values(questions)[questionIndex]

      let noAnswer = document.getElementsByClassName('noAnswer');
                for (let i = 0, max = noAnswer.length; i < max; i++) {      // make sure the 'enter answer' message is display none to begin with
                    noAnswer[i].style.visibility = "hidden";
                }


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
                        // and if less than two attempts
                        if (attempts < (allowedAttempts - 1)) {
                                setAttempts(attempts + 1) // Add one to the number of attempts 
                        } 
                        // and attempts equal to 2
                        else if (attempts === (allowedAttempts - 1)) {
                                let revealAnswer = document.getElementsByClassName('correctAnswer');   
                                    for (let i = 0, max = revealAnswer.length; i < max; i++) {      // display correct answer
                                        revealAnswer[i].style.visibility = "visible";
                                    }
                                setAttempts(attempts + 1)  // Add one to the number of attempts

                                let checkBtn = document.getElementById("checkBtn")
                                console.log(checkBtn)

                                // document.getElementById("checkBtn").value = "NEXT";
                                


                        }
                        // and attempts equal to 3
                        else if (attempts === allowedAttempts) {
                                setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
                                NextQuestion() // Next Questions
                                setAttempts(0) // reset the attempts back to 0 for next question
                                setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                                setUserAnswer('')
                                let revealAnswer = document.getElementsByClassName('correctAnswer');   // display correct answer
                                    for (let i = 0, max = revealAnswer.length; i < max; i++) {      
                                        revealAnswer[i].style.visibility = "hidden";
                                    }
                        }
                } 
            
                // if no answer
                    else {
                            let noAnswer = document.getElementsByClassName('noAnswer');   // display enter answer message if no answer from user
                            for (let i = 0, max = noAnswer.length; i < max; i++) {      
                                noAnswer[i].style.visibility = "visible";
                            }
                }   

          

      } else if (numOfAnsweredQuestions === totalNumOfQuestions) {

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


      if (correct + incorrect === (totalNumOfQuestions - 1) && attempts === (allowedAttempts - 1)) {
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
                  correctAnswer={correctAnswer}
                  />
              </Route>
            </Switch>
            
            <Footer 
            RestartQuizVariables={RestartQuizVariables}
            StartClickHnd={StartClickHnd}
            SkipQuestion={SkipQuestion}
            attempts={attempts}
            />
        </div>
    </Router>
    
  )
}

export default App