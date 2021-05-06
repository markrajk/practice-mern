import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Card from './components/Card'
import Main from './components/Main'
import Profile from './components/Profile'

const App = () => {
  return (
    <Router>
      <Main>
        <Route exact path="/" component={Profile} />
        <Route
          exact
          path="/login"
          render={(props) => <Card {...props} cardType="login" />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Card {...props} cardType="signup" />}
        />
      </Main>
    </Router>
  )
}

export default App
