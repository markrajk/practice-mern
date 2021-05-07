import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, NavLink } from './styles'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleLougout = () => {
    dispatch(logout())
  }
  return (
    <Container>
      <Nav>
        <NavLink style={{ marginRight: 'auto', marginLeft: 0 }}>
          <Link to="/">Home</Link>
        </NavLink>
        {userInfo && (
          <NavLink>
            <Link to={`/users/${userInfo._id}`}>
              {userInfo.firstName} {userInfo.lastName}
            </Link>
          </NavLink>
        )}
        <NavLink>
          {userInfo ? (
            <Link to="/#" onClick={handleLougout}>
              Log Out
            </Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </NavLink>
      </Nav>
    </Container>
  )
}

export default Header
