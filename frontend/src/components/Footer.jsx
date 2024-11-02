import React from "react"

const Footer = (props) => {
    
    const { RestartQuizVariables, StartClickHnd, SkipQuestion, attempts } = props  // destructuring props

    return (

        <div className="footer-container">

            <div className="footer-left">
                    <input id="quitBtn" className="quitBtn" type="button" value="QUIT" onClick={RestartQuizVariables}/>
            </div>

            <div className="footer-center">
                <h3>ATTEMPTS: </h3>
                <div>
                {[...Array(attempts)].map((_, index) => (
                    <img key={index} className="attemptImg" src="/x_symbol.png" alt="" />
                ))} 
                </div>
            </div>

            <div className="footer-right">
                <input id="startBtn" className="startBtn" type="button" value="START" onClick={StartClickHnd}/>
                <button id="skip" className="skipBtnActive" onClick={SkipQuestion}>SKIP</button>  
            </div>
            
        </div>

    )

}

export default Footer