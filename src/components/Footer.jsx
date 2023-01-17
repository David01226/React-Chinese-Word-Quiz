import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-left">
                <input type="button" value="QUIT" />
            </div>
            <div className="footer-center">
                <h3>ATTEMPTS: </h3>
                <div>
                    <img src="/x_symbol.png" alt="" />
                </div>
            </div>
            <div className="footer-right">
                <Link to='/quiz'>
                    <input type="button" value="START" />
                </Link>
                
            </div>
        </div>
    )
}

export default Footer