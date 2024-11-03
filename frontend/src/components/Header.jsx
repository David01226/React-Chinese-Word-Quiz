const Header = (props) => {

    const { numOfAnsweredQuestions, totalNumOfQuestions, RestartQuizVariables } = props  // destructuring of props

    let barWidth = (100 / totalNumOfQuestions) * numOfAnsweredQuestions  // calculating progress bar width
                                                                        
    var progressStyle = {
        width: String(barWidth) + "%"   // converts calculation above into a string to be used for inline CSS
    }

    return (

        <div className="header-container">

            <div className="header-left">
                    <img src="/chinese_flag.png" alt="" onClick={RestartQuizVariables}/>   
            </div>

            <div className="header-center">
                <div className="progress-bar-container">
                    <div style={progressStyle} className="progress-bar"></div>
                </div>
            </div>

            <div className="header-right">
                <h2>{numOfAnsweredQuestions}/{totalNumOfQuestions}</h2>
            </div>
            
        </div>

    )

}

export default Header