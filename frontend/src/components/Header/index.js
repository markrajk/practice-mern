import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notifications from './Notifications'
import { Container, Nav, NavLink, ProfileImg } from './styles'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const gotUser = useSelector((state) => state.getUser)
  // const { userInfo: userInfoGot } = gotUser
  const updatedMe = useSelector((state) => state.updateMe)
  const { success } = updatedMe

  const [timestamp, setTimestamp] = React.useState(Date.now())

  const handleLougout = () => {
    dispatch(logout())
  }

  // const handleBellClick = () => {
  //   dispatch(getUser(userInfo._id))
  // }

  useEffect(() => {
    setTimestamp(Date.now())
  }, [success])

  return (
    <Container>
      <Nav>
        <NavLink style={{ marginRight: 'auto', marginLeft: 0 }}>
          <Link to="/">Home</Link>
        </NavLink>

        {userInfo && <Notifications userInfo={userInfo} />}

        {userInfo && (
          <NavLink>
            <Link to={`/createTeam`}>Create Team</Link>
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
        {userInfo && (
          <NavLink>
            <Link to={`/users/${userInfo._id}`}>
              <ProfileImg
                key={`${userInfo._id}-${timestamp}`}
                src={`/img/users/${userInfo.photoSm}`}
                alt={userInfo.fullName}
              />
            </Link>
          </NavLink>
        )}
      </Nav>
    </Container>
  )
}

export default Header
