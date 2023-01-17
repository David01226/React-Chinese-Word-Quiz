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
                <h1>Question Number: {numOfAnsweredQuestions} of {totalNumOfQuestions}</h1>
                <h1>Correct: {correct}</h1>
                <h1>Incorrect: {incorrect}</h1>
                <h1>Number of attempts: {attempts}</h1>
                <h3 className='question'>What is the Chinese for <span>{currentQuestion}</span> ?</h3>
                
                <form onSubmit={onSubmitForm} className='user-input-container'>
                    <input type="text" name="" id="" onChange={AnswerHnd} />
                    <input type="submit" value="CHECK" onClick={CheckClickHnd} />
                </form>
                
            </div>
        </div>
    )
}

export default QuestionPage