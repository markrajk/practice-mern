import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Title, InputContainer, Input, CardButton } from './styles'
import { signup, login } from '../../actions/userActions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../Loader'

const Card = ({ cardType, history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading: loginLoading } = userLogin

  const userSignup = useSelector((state) => state.userSignup)
  const { loading, error } = userSignup

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const loginSubmitHandler = () => {
    dispatch(login(email, password))
  }

  const signupSubmitHandler = () => {
    dispatch(signup(firstName, lastName, email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, dispatch])

  return (
    <Container>
      <Title>{cardType === 'login' ? 'Please Log In' : 'Please Sign Up'}</Title>
      {cardType === 'login' && (
        <>
          <Input
            required
            type="email"
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            required
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <CardButton onClick={loginSubmitHandler}>
            {loginLoading ? <Loader loading={loginLoading} /> : 'Submit'}
          </CardButton>
          <p>
            Dont have account yet? <Link to="/signup">Sign up.</Link>{' '}
          </p>
        </>
      )}
      {cardType === 'signup' && (
        <>
          <InputContainer>
            <Input
              required
              type="text"
              placeholder="Enter first name..."
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <Input
              required
              type="text"
              placeholder="Enter last name..."
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </InputContainer>
          <Input
            required
            type="email"
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            required
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <CardButton onClick={signupSubmitHandler}>
            {loading ? <Loader loading={loading} /> : 'Submit'}
          </CardButton>
          <p>
            Already have an account? <Link to="/login">Log in.</Link>{' '}
          </p>
        </>
      )}
    </Container>
  )
}

export default withRouter(Card)
