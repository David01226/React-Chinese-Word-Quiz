import './Component.style.css'
import { questions } from '../Questions'
import { useState } from 'react'

const QuestionPage = () => {

    // state variables
    const [userAnswer, setUserAnswer] = useState('');
    const [questionIndex, setQuestionIndex] = useState(10);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [numOfAnsweredQuestions, setNumOfAnsweredQuestions] = useState(1);

    let totalNumOfQuestions = 10
    const allowedAttempts = 3


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
        const correctAnswer = Object.values(questions)[10]



        if (numOfAnsweredQuestions < totalNumOfQuestions) {

            // if correct
            if (userAnswer === correctAnswer) {
                setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                setCorrect(correct + 1) // Add 1 to number of correct
                setAttempts(0) // Reset attempts back to 0 before next question
                NextQuestion() // Next Question
                
            } 

            // if incorrect and not empty
            else if (userAnswer !== correctAnswer && userAnswer !== ''){
                if (attempts < allowedAttempts) {
                    setAttempts(attempts + 1) // Add one to the number of attempts if attempts is less than 3
                                       
                } else if (attempts === allowedAttempts) {
                    setIncorrect(incorrect + 1) // Add one to incorrect after using all 3 attempts
                    setAttempts(0) // reset the attempts back to 0 for next question
                    setNumOfAnsweredQuestions(numOfAnsweredQuestions + 1) // Add 1 to number of questions answered
                    NextQuestion() // Next Questions
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




    // prevents default submit action
    const onSubmitForm = (e) => {
        e.preventDefault();       
    };






    // Main output
    return (
        <div className="main-content-container">
            <div className='question-container'>
                <h1>Question Number: {numOfAnsweredQuestions} of {totalNumOfQuestions}</h1>
                <h1>Correct: {correct}</h1>
                <h1>Incorrect: {incorrect}</h1>
                <h1>Number of attempts: {attempts}</h1>
                <h3 className='question'>What is the Chinese for <span>{Object.keys(questions)[questionIndex].toUpperCase()}</span> ?</h3>
                
                <form onSubmit={onSubmitForm} className='user-input-container'>
                    <input type="text" name="" id="" onChange={AnswerHnd} />
                    <input type="submit" value="CHECK" onClick={CheckClickHnd} />
                </form>
                
            </div>
        </div>
    )
}

export default QuestionPage