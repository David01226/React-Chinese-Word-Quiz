const StartMenu = () => {
    return (
        <div className="start-menu-container">
            <div className="start-menu-text">
                <h1>Welcome to <span>THE CHINESE QUIZ</span></h1>
                <p>Please select how many words you would like to be quizzed on.</p>
            </div>
            
            <div className="start-menu-options">
                <div className="start-options-left">
                    <div className="option-float-left">
                        <input type="button" value="10" />
                    </div>
                    <div className="option-float-right">
                        <input type="button" value="20" />
                    </div>
                    
                    
                </div>

                <div className="start-options-center">
                    <img src="/chinese_flag.png" alt="" />
                    <input type="button" value="50" />
                </div>

                <div className="start-options-right">
                    <div className="option-float-right">
                        <input type="button" value="100" />
                    </div>
                    <div className="option-float-left">
                        <input type="button" value="80" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default StartMenu