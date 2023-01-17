import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-left">
                <Link to='/'>
                    <img src="/chinese_flag.png" alt="" />
                </Link>
                
            </div>
            <div className="header-center">
                <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                </div>
            </div>
            <div className="header-right">
                <h1>3/10</h1>
            </div>
            
        </div>
    )
}

export default Header