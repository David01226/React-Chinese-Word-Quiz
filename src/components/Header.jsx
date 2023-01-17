import { Link } from "react-router-dom"

const Header = (props) => {

    //props
    const { numOfAnsweredQuestions, totalNumOfQuestions } = props

    let barWidth = (800 / totalNumOfQuestions) * numOfAnsweredQuestions

    var progresStyle = {
        width: String(barWidth) + "px"
    }

    return (
        <div className="header-container">
            <div className="header-left">
                <Link to='/'>
                    <img src="/chinese_flag.png" alt="" />
                </Link>
                
            </div>
            <div className="header-center">
                <div className="progress-bar-container">
                    <div style={progresStyle} className="progress-bar"></div>
                </div>
            </div>
            <div className="header-right">
                <h1>{numOfAnsweredQuestions}/{totalNumOfQuestions}</h1>
            </div>
            
        </div>
    )
}

export default Header