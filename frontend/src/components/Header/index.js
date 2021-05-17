import React from 'react'
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

  const handleLougout = () => {
    dispatch(logout())
  }

  // const handleBellClick = () => {
  //   dispatch(getUser(userInfo._id))
  // }

  // useEffect(() => {
  //   console.log(userInfoGot)
  //   if (!userInfoGot) {
  //     dispatch(getUser(userInfo._id))
  //   }
  // }, [userInfoGot, dispatch])

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
