import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Card from './components/Card'
import Main from './components/Main'
import Profile from './components/Profile'
import Header from './components/Header'
import Wall from './components/Wall'
import Post from './components/Post'

const App = () => {
  return (
    <Router>
      <Header />
      <Main>
        <Route exact path="/" component={Wall} />

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
        <Route exact path="/users/:id" component={Profile} />
        <Route exact path="/posts/:id" component={Post} />
      </Main>
    </Router>
  )
}

export default App
