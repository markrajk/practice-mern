import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Title, SubTitle, TextLink } from './styles.js'
import { logout } from '../../actions/userActions'

const Profile = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo, dispatch])

  return (
    <Container>
      {userInfo && (
        <>
          <Title>
            {userInfo.firstName} {userInfo.lastName}
          </Title>
          <SubTitle>{userInfo.email}</SubTitle>
          <TextLink onClick={logoutHandler}>Logout</TextLink>
        </>
      )}
    </Container>
  )
}

export default Profile
