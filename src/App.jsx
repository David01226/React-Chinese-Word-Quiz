import './App.css'
import Header from './components/Header'
import QuestionPage from './components/QuestionPage'
import Footer from './components/Footer'
import StartMenu from './components/StartMenu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  return (
    <Router>
        <div className="app-container">
            <Header />

            <Switch>
              <Route exact path='/'>
                  <StartMenu />
              </Route>
              <Route path='/quiz'>
                  <QuestionPage />
              </Route>
            </Switch>
            
            <Footer />
        </div>
    </Router>
    
  )
}

export default App
