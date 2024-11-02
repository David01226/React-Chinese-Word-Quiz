import './App.css'
import Header from './components/Header'
import QuestionPage from './components/QuestionPage'
import Footer from './components/Footer'
import StartMenu from './components/StartMenu'
import { useState, useEffect, useContext } from 'react'
import { QuizContext } from "./context/QuizContext"


function App(props) {    
    const {words, currentQuestion, correctAnswer, totalWords, setCurrentQuestion, setCorrectAnswer, setRandomIndex} = useContext(QuizContext)
    // state variables

    const [userAnswer, setUserAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [numOfAnsweredQuestions, setNumOfAnsweredQuestions] = useState(1);
    const [totalNumOfQuestions, setTotalNumOfQuestions] = useState(10)
    const allowedAttempts = 3
    
    // When user selects number of questions from start menu
    const ClickNumOfQuestions = (e) => {
    
            const stringTotalNumOfQuestions = e.target.value  // store the value of button clicked in a variable
            setTotalNumOfQuestions(+stringTotalNumOfQuestions)  // use this variable to set total number of questions (+ operator converts the string to a number)
            
            let buttons = document.querySelectorAll('.startOptions')
            for (let i = 0, max = buttons.length; i < max; i++) {      // When a button is clicked all are reset to original color before changing the selected to red
                buttons[i].style.backgroundColor = "#FFFFFF";
                buttons[i].style.borderColor = "#e5e5e5";
                buttons[i].style.boxShadow = "0px 3px 0px #e5e5e5";

            }
    
            let selectedButton = e.target                        // changes the selected button to red
            selectedButton.style.borderColor = "#EE0F0F";
            selectedButton.style.boxShadow = "0px 3px 0px #ee0f0f";
    
    
            let startButton = document.getElementsByClassName('startBtn');  // changes start button properties to active appearance
            for (let i = 0, max = startButton.length; i < max; i++) {      
                startButton[i].style.backgroundColor = "#EE0F0F";
                startButton[i].style.opacity = "1";
                startButton[i].style.cursor = "pointer";
            }
            
    }
    
    
    // Triggered when start button is clicked IF below condition met
    const StartClickHnd = () => {
    
        let startBtn = document.getElementById('startBtn')
        if (startBtn.style.opacity === '1') { // if start button has opacity of 1, indicating that it is "active" and an opetion has been selected from start menu
    
                let starMenu = document.getElementsByClassName('start-menu-container');   // hide start menu after clicking start
                for (let i = 0, max = starMenu.length; i < max; i++) {      
                    starMenu[i].style.display = "none";
                }
                
    
                let questionContainer = document.getElementsByClassName('main-content-container');   // This makes the questions visible after clicking start
                for (let i = 0, max = questionContainer.length; i < max; i++) {      
                    questionContainer[i].style.display = "flex";
                }
    
    
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
    
                let startButton = document.getElementsByClassName('startBtn');   // hides start button / no longer needed until restart
                for (let i = 0, max = startButton.length; i < max; i++) {      
                    startButton[i].style.display = "none";
                }
    
                let skipButton = document.getElementById('skip')   // change skip button properties to active state and make visible
                skipButton.classList.remove('skipBtnInactive')
                skipButton.classList.add('skipBtnActive')
                let skipButtonActive = document.getElementsByClassName('skipBtnActive')
                for (let i = 0, max = skipButtonActive.length; i < max; i++) {      
                    skipButtonActive[i].style.display = "block";
    
                }
    
                let quitButton = document.getElementsByClassName('quitBtn');  // change quit button properties to active appearance
                for (let i = 0, max = quitButton.length; i < max; i++) {      
                    quitButton[i].style.opacity = "1";
                    quitButton[i].style.cursor = "pointer";
                }
     
        } else return  // the alternative renders the start button inactive if the user doesn't select an option from the start menu
        
    }
    
    
    // generates next random question
    const NextQuestion = () => {
        let newIndex = Math.floor(Math.random() * Number(totalWords))
        setCurrentQuestion(Object.keys(words)[newIndex])
        setCorrectAnswer(Object.values(words)[newIndex])
    }
    
    
    // Trigerred when skip button is pressed subject to certain conditions being met
    const SkipQuestion = () => {
    
            let skipBtn = document.getElementById('skip')
            if (skipBtn.classList.contains('skipBtnActive')  && numOfAnsweredQuestions < totalNumOfQuestions) { // if skip button active and current question is not the last question
                
                setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
                NextQuestion() // Next Questions
                setAttempts(0) // reset the attempts back to 0 for next question
                setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                setUserAnswer('') // reset user input
                let noAnswer = document.getElementsByClassName('noAnswer');
                for (let i = 0, max = noAnswer.length; i < max; i++) {      // make sure the 'enter answer' message is display none to when skip question
                    noAnswer[i].style.display = "none";
                }
    
            } else if (numOfAnsweredQuestions === totalNumOfQuestions && attempts !== allowedAttempts) { // current question is the last question and the user has attempts left
    
                setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
                setAttempts(0) // reset the attempts back to 0 for next question
                setUserAnswer('') // reset user input
    
                let noAnswer = document.getElementsByClassName('noAnswer');    // hide 'enter answer' message
                for (let i = 0, max = noAnswer.length; i < max; i++) {      
                    noAnswer[i].style.display = "none";
                }
                
                let questions = document.getElementsByClassName('question-container');    // hide the question section
                for (let i = 0, max = questions.length; i < max; i++) {     
                    questions[i].style.display = "none";
                }
    
                let gameStats = document.getElementsByClassName('game-stats');  // reveal the game-stats as no more questions
                for (let i = 0, max = gameStats.length; i < max; i++) {     
                    gameStats[i].style.display = "flex";
                }
    
                let attempts = document.getElementsByClassName('footer-center');  // hide attempts
                for (let i = 0, max = attempts.length; i < max; i++) {       
                    attempts[i].style.display = "none";
                }
    
                let skipButton = document.getElementById('skip')  // hide skip button
                skipButton.style.display = "none";
                
        } else return 
    
    }
    
    
    // asigns users answer to the userAnswer state
    const AnswerHnd = (e) => {
        const answer = e.target.value
        setUserAnswer(answer)
    }
    
    
    // Triggered when user clicks the CHECK button or clicks enter subject to the below conditions
    const CheckClickHnd = () => {
    
            let noAnswer = document.getElementsByClassName('noAnswer');     // ensure 'enter answer' message is hidden if previous input was ''
                    for (let i = 0, max = noAnswer.length; i < max; i++) {      
                        noAnswer[i].style.display = "none";
                    }
    
            // if user not on the last question
            if (numOfAnsweredQuestions < totalNumOfQuestions) {  
    
                            // if correct
                            if (userAnswer === correctAnswer) {
    
                                    setCorrect(correct + 1) // Add 1 to number of correct
                                    setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                                    setAttempts(0) // Reset attempts back to 0 before next question
                                    NextQuestion() // Next Question
                                    setUserAnswer('') // reset user input field
    
                            } 
    
    
                            // if incorrect and not empty
                            else if (userAnswer !== correctAnswer && userAnswer !== '') {
    
                                    // and if less than two attempts
                                    if (attempts < (allowedAttempts - 1)) {
                                            setAttempts(attempts + 1) // Add one to the number of attempts 
                                    } 
    
                                    // and if attempts equal to 2
                                    else if (attempts === (allowedAttempts - 1)) {
    
                                            setAttempts(attempts + 1)  // Add one to the number of attempts
    
                                            let revealAnswer = document.getElementsByClassName('correctAnswer');   // display correct answer
                                            for (let i = 0, max = revealAnswer.length; i < max; i++) {      
                                                revealAnswer[i].style.display = "block";
                                            }
                                            
                                            let checkBtn = document.getElementById("checkBtn")  // change check button to "NEXT" button
                                            checkBtn.innerHTML = "NEXT"
    
                                            let skipButton = document.getElementById('skip') // make skip button inactive as function not currently available
                                            skipButton.classList.remove('skipBtnActive')
                                            skipButton.classList.add('skipBtnInactive')      
    
                                    }
    
                                    // and if attempts equal to 3
                                    else if (attempts === allowedAttempts) {
    
                                            setIncorrect(incorrect + 1) // Add 1 to incorrect after using all 3 attempts
                                            NextQuestion() // Next Questions
                                            setAttempts(0) // reset the attempts back to 0 for next question
                                            setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                                            setUserAnswer('') // reset user input field
    
                                            let revealAnswer = document.getElementsByClassName('correctAnswer');   // display correct answer
                                            for (let i = 0, max = revealAnswer.length; i < max; i++) {      
                                                revealAnswer[i].style.display = "none";
                                            }
    
                                            let checkBtn = document.getElementById("checkBtn")  // change "NEXT" button back to "CHECK" button
                                            checkBtn.innerHTML = "CHECK"
    
                                            let skipButton = document.getElementById('skip')  // make skip button inactive as function not currently available
                                            skipButton.classList.remove('skipBtnInactive')
                                            skipButton.classList.add('skipBtnActive')
    
                                    }
                                    
                            } 
                        
                            // if no answer
                            else {
                                    let noAnswer = document.getElementsByClassName('noAnswer');   // display enter answer message if no answer from user
                                    for (let i = 0, max = noAnswer.length; i < max; i++) {      
                                        noAnswer[i].style.display = "block";
                                    }
                            }      
    
            } 
            
            // else if user on the last question
            else if (correct + incorrect === (totalNumOfQuestions - 1)) {  
    
                            // and if correct
                            if (userAnswer === correctAnswer) {
    
                                    setCorrect(correct + 1) // add 1 to correct
    
                                    let questions = document.getElementsByClassName('question-container');  // hide question section
                                    for (let i = 0, max = questions.length; i < max; i++) {     
                                        questions[i].style.display = "none";
                                    }
    
                                    let gameStats = document.getElementsByClassName('game-stats');  // reveal quiz results
                                    for (let i = 0, max = gameStats.length; i < max; i++) {     
                                        gameStats[i].style.display = "flex";
                                    }
    
                                    let attempts = document.getElementsByClassName('footer-center');  // hide attempts
                                    for (let i = 0, max = attempts.length; i < max; i++) {      
                                        attempts[i].style.display = "none";
                                    }
                            
                                    let skipButton = document.getElementById('skip')  // hide skip button
                                    skipButton.style.display = "none";
    
                            } 
                            
                            // and if incorrect and not an empty input
                            else if (userAnswer !== correctAnswer && userAnswer !== '') {
    
                                    // and if attempts less than 2
                                    if (attempts < (allowedAttempts - 1)) {
                                            setAttempts(attempts + 1) // Add one to the number of attempts 
                                    } 
    
                                    // else if attempts equal to 2
                                    else if (attempts === (allowedAttempts - 1)) {
    
                                            setAttempts(attempts + 1)  // Add one to the number of attempts
    
                                            let revealAnswer = document.getElementsByClassName('correctAnswer');   // display correct answer
                                            for (let i = 0, max = revealAnswer.length; i < max; i++) {      
                                                revealAnswer[i].style.display = "block";
                                            }
    
                                            let checkBtn = document.getElementById("checkBtn")  // change check button to "NEXT" button
                                            checkBtn.innerHTML = "NEXT"
    
                                            let skipButton = document.getElementById('skip')  // make skip button inactive as function not currently available
                                            skipButton.classList.remove('skipBtnActive')
                                            skipButton.classList.add('skipBtnInactive')
    
                                    }
    
                                    // else if attempts equal to 3
                                    else if (attempts === allowedAttempts) {
    
                                            setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
                                            setAttempts(0) // reset the attempts back to 0 for next question
                                            setUserAnswer('') // reset user input field
    
                                            let revealAnswer = document.getElementsByClassName('correctAnswer');   // display correct answer
                                            for (let i = 0, max = revealAnswer.length; i < max; i++) {      
                                                revealAnswer[i].style.display = "none";
                                            }
    
                                            let checkBtn = document.getElementById("checkBtn")  // change "NEXT" button back to "CHECK" button
                                            checkBtn.innerHTML = "CHECK"
    
                                            let questions = document.getElementsByClassName('question-container'); // hide question section
                                            for (let i = 0, max = questions.length; i < max; i++) {     
                                                questions[i].style.display = "none";
                                            }
    
                                            let gameStats = document.getElementsByClassName('game-stats'); // reveal quiz results
                                            for (let i = 0, max = gameStats.length; i < max; i++) {     
                                                gameStats[i].style.display = "flex";
                                            }
    
                                            let attempts = document.getElementsByClassName('footer-center'); // hide attempts
                                            for (let i = 0, max = attempts.length; i < max; i++) {      
                                                attempts[i].style.display = "none";
                                            }
                                    
                                            let skipButton = document.getElementById('skip') // hide skip button
                                            skipButton.style.display = "none";
    
                                    }
    
                            }
    
                            // if no answer
                            else {
                                    let noAnswer = document.getElementsByClassName('noAnswer');   // display 'enter answer' message if no answer from user
                                    for (let i = 0, max = noAnswer.length; i < max; i++) {      
                                        noAnswer[i].style.display = "block";
                                    }
                            }              
    
            } 
    
    }

        // Resets all variables after game has finished or if exited
    const RestartQuizVariables = () => {

        let quitBtn = document.getElementById('quitBtn')
        if (quitBtn.style.opacity === "1") { // if the game is in progress (in this case indicated by the quit button having an opacity of 1) 
                
                // reset variable states
                setUserAnswer('');
                NextQuestion()
                setCorrect(0);
                setIncorrect(0);
                setAttempts(0);
                setNumOfAnsweredQuestions(1);
                setTotalNumOfQuestions(10);


                let buttons = document.querySelectorAll('.startOptions')
                for (let i = 0, max = buttons.length; i < max; i++) {      // reset all buttons to original color before changing the selected to red
                    buttons[i].style.backgroundColor = "#FFFFFF";
                }

                let attempts = document.getElementsByClassName('footer-center');
                for (let i = 0, max = attempts.length; i < max; i++) {              // hide attempts
                    attempts[i].style.display = "none";
                }

                let progress = document.getElementsByClassName('header-center');
                for (let i = 0, max = progress.length; i < max; i++) {             // hide progress bar
                    progress[i].style.display = "none";
                }

                let questionNum = document.getElementsByClassName('header-right');
                for (let i = 0, max = questionNum.length; i < max; i++) {           // hide question count
                    questionNum[i].style.display = "none";
                }

                let startButton = document.getElementsByClassName('startBtn');  // reset start button properties and make visible
                for (let i = 0, max = startButton.length; i < max; i++) {      
                    startButton[i].style.backgroundColor = "#FFFFFF"; 
                    startButton[i].style.display = "block";
                    startButton[i].style.opacity = "0.4";
                    startButton[i].style.cursor = "default";
                    startButton[i].style.boxShadow = "unset";
                }

                let skipButton = document.getElementById('skip')      // reset skip button back to Active class but make it invisible
                skipButton.classList.remove('skipBtnInactive')
                skipButton.classList.add('skipBtnActive')
                let skipButtonActive = document.getElementsByClassName('skipBtnActive')
                for (let i = 0, max = skipButtonActive.length; i < max; i++) {      
                    skipButtonActive[i].style.display = "none";
                }

                let quitButton = document.getElementsByClassName('quitBtn');  // reset quit button properties
                for (let i = 0, max = quitButton.length; i < max; i++) {      
                    quitButton[i].style.opacity = "0.4";
                    quitButton[i].style.cursor = "default";
                    quitButton[i].style.boxShadow = "unset";
                } 

                let starMenu = document.getElementsByClassName('start-menu-container');   // reveals the start menu again after restarting
                for (let i = 0, max = starMenu.length; i < max; i++) {      
                    starMenu[i].style.display = "flex";
                }
            

                let questionContainer = document.getElementsByClassName('main-content-container');   // hides the questions after restarting
                for (let i = 0, max = questionContainer.length; i < max; i++) {      
                    questionContainer[i].style.display = "none";
                }

                let questions = document.getElementsByClassName('question-container');  // reveal question section
                for (let i = 0, max = questions.length; i < max; i++) {     
                    questions[i].style.display = "flex";
                }

                let gameStats = document.getElementsByClassName('game-stats');  // hide the game-stat section 
                for (let i = 0, max = gameStats.length; i < max; i++) {     
                    gameStats[i].style.display = "none";
                }

                let revealAnswer = document.getElementsByClassName('correctAnswer');   
                for (let i = 0, max = revealAnswer.length; i < max; i++) {      // hide correct answer
                    revealAnswer[i].style.display = "none";
                }

                let noAnswer = document.getElementsByClassName('noAnswer');
                for (let i = 0, max = noAnswer.length; i < max; i++) {      // hide 'enter answer' message 
                    noAnswer[i].style.display = "none";
                }

                let checkBtn = document.getElementById("checkBtn")  // change "NEXT" button back to "CHECK" button
                checkBtn.innerHTML = "CHECK"

        } else return  
    
    }



    return (
  
            <div className="app-container">
                <Header 
                numOfAnsweredQuestions={numOfAnsweredQuestions}
                totalNumOfQuestions={totalNumOfQuestions}
                RestartQuizVariables={RestartQuizVariables}
                />

                <StartMenu ClickNumOfQuestions={ClickNumOfQuestions}/>

                <QuestionPage 
                userAnswer={userAnswer}
                correct={correct}
                incorrect={incorrect}
                attempts={attempts}
                numOfAnsweredQuestions={numOfAnsweredQuestions}
                totalNumOfQuestions={totalNumOfQuestions}
                currentQuestion={currentQuestion}
                AnswerHnd={AnswerHnd}
                CheckClickHnd={CheckClickHnd}
                correctAnswer={correctAnswer}
                />

                <Footer 
                RestartQuizVariables={RestartQuizVariables}
                StartClickHnd={StartClickHnd}
                SkipQuestion={SkipQuestion}
                attempts={attempts}
                />
            </div>

    )


}

export default App