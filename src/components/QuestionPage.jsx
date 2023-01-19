import './Component.style.css'


const QuestionPage = (props) => {

    // Destructured props
    const {
        userAnswer, 
        questionIndex,
        correct,
        incorrect,
        attempts,
        numOfAnsweredQuestions,
        totalNumOfQuestions,
        allowedAttempts,
        currentQuestion,
        AnswerHnd,
        CheckClickHnd,
    } = props

    // prevents default submit action
    const onSubmitForm = (e) => {
        e.preventDefault(); 
    };



    // Main output
    return (
        <div className="main-content-container">
            <div className='question-container'>
                <h3 className='question'>What is the Chinese for <span>{currentQuestion}</span> ?</h3>
                
                <form onSubmit={onSubmitForm} className='user-input-container'>
                    <input type="text" name="" id="" onChange={AnswerHnd} value={userAnswer} />
                    <input type="submit" value="CHECK" onClick={CheckClickHnd} />
                </form>
                
            </div>


            <div className="game-stats-hidden-by-default">
                <p>Question Number: {numOfAnsweredQuestions} of {totalNumOfQuestions}</p>
                <p>Correct: {correct}</p>
                <p>Incorrect: {incorrect}</p>
                <p>Number of attempts: {attempts}</p>
            </div>
            
        </div>
    )
}

export default QuestionPage