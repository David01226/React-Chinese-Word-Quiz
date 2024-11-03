import './Component.style.css'

const QuestionPage = (props) => {


    // Destructured props
    const {
        userAnswer, 
        correct,
        incorrect,
        attempts,
        numOfAnsweredQuestions,
        totalNumOfQuestions,
        currentQuestion,
        AnswerHnd,
        CheckClickHnd,
        correctAnswer,
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

                <div className='messages'>
                    <h3 className='noAnswer'>Enter answer</h3>
                    <h3 className='correctAnswer'>Correct Answer: {correctAnswer}</h3>
                </div>

                <form onSubmit={onSubmitForm} className='user-input-container'>
                    <input type="text" name="" id="" onChange={AnswerHnd} value={userAnswer} />
                    <button className="checkBtn" id='checkBtn' type="submit" onClick={CheckClickHnd}>CHECK</button>
                </form>
            </div>

            <div className="game-stats">
                <h2>QUIZ RESULTS</h2>
                <p className='totalResult'>Total Questions: {totalNumOfQuestions}</p>
                <p className='correctResult'>Correct: {correct}</p>
                <p className='incorrectResult'>Incorrect: {incorrect}</p>
            </div>


            {/* This is for de-bugging purposes only */}
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