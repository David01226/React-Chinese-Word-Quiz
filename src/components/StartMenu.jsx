const StartMenu = (props) => {

    const { ClickNumOfQuestions } = props
    return (
        <div className="start-menu-container">
            <div className="start-menu-text">
                <h1>Welcome to <span>THE CHINESE QUIZ</span></h1>
                <p>Please select how many words you would like to be quizzed on.</p>
            </div>
            
            <div className="start-menu-options">
                <div className="start-options-left">
                    <div className="option-float-left">
                        <input className="startOptions" type="button" value="10" onClick={ClickNumOfQuestions}/>
                    </div>
                    <div className="option-float-right">
                        <input className="startOptions" type="button" value="20" onClick={ClickNumOfQuestions}/>
                    </div>
                    
                    
                </div>

                <div className="start-options-center">
                    <img src="/chinese_flag.png" alt="" />
                    <input className="startOptions" type="button" value="50" onClick={ClickNumOfQuestions}/>
                </div>

                <div className="start-options-right">
                    <div className="option-float-right">
                        <input className="startOptions" type="button" value="100" onClick={ClickNumOfQuestions}/>
                    </div>
                    <div className="option-float-left">
                        <input className="startOptions" type="button" value="80" onClick={ClickNumOfQuestions}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default StartMenu