import { Link } from "react-router-dom"

const Footer = (props) => {

    const { RestartQuizVariables, StartClickHnd, SkipQuestion, attempts } = props

    // const checkUserSelected = () => { 
    //     let startButton = document.getElementsByClassName('startBtn');
    //     if (startButton.style.backgroundColor === '#EE0F0F') {
    //         return '/quiz'
    //     } else {
    //         return ''
    //     }
    // }

  
        


    
    return (
        <div className="footer-container">
            <div className="footer-left">
                <Link to='/'>
                    <input className="quitBtn" type="button" value="QUIT" onClick={RestartQuizVariables}/>
                </Link>
            </div>
            <div className="footer-center">
                <h3>ATTEMPTS: </h3>
                <div>
                {[...Array(attempts)].map(() => <img className='attemptImg' src="/x_symbol.png" alt="" />)}   
                </div>
            </div>
            <div className="footer-right">
                <Link to='/quiz' style={{ textDecoration: 'none' }}>
                    <input className="startBtn" type="button" value="START" onClick={StartClickHnd}/>
                </Link>

                <input className="skipBtn" type="button" value="SKIP" onClick={SkipQuestion}/>
                
            </div>
            
        </div>
    )
}

export default Footer