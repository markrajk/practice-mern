import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Nav, NavLink } from './styles'
import { Link } from 'react-router-dom'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <Container>
      <Nav>
        <NavLink style={{ marginRight: 'auto', marginLeft: 0 }}>
          <Link to="/">Home</Link>
        </NavLink>
        {userInfo && (
          <NavLink>
            <Link to="/me">
              {userInfo.firstName} {userInfo.lastName}
            </Link>
          </NavLink>
        )}
        <NavLink>
          {userInfo ? (
            <Link to="/login">Log Out</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </NavLink>
      </Nav>
    </Container>
  )
}

export default Header
