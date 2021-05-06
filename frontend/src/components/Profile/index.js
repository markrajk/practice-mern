import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Title,
  SubTitle,
  TextLink,
  Buttons,
  Editable,
} from './styles.js'
import { logout, updateMe } from '../../actions/userActions'

const Profile = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const logoutHandler = () => {
    dispatch(logout())
  }

  const saveHandler = () => {
    dispatch(updateMe(firstName, lastName, email))
    setEdit(!edit)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setEmail(userInfo.email)
    }
  }, [userInfo, dispatch, history])

  return (
    <Container>
      {userInfo && (
        <>
          <Title>
            <Editable
              edit={edit}
              suppressContentEditableWarning
              onInput={(e) => setFirstName(e.target.textContent)}
            >
              {userInfo.firstName}
            </Editable>{' '}
            <Editable
              edit={edit}
              suppressContentEditableWarning
              onInput={(e) => setLastName(e.target.textContent)}
            >
              {userInfo.lastName}
            </Editable>
          </Title>
          <SubTitle>
            <Editable
              edit={edit}
              suppressContentEditableWarning={true}
              onInput={(e) => setEmail(e.target.textContent)}
            >
              {userInfo.email}
            </Editable>
          </SubTitle>
          <Buttons>
            <TextLink onClick={logoutHandler}>Logout</TextLink>
            {!edit ? (
              <TextLink onClick={() => setEdit(!edit)}>Update</TextLink>
            ) : (
              <TextLink onClick={saveHandler}>Save</TextLink>
            )}
          </Buttons>
        </>
      )}
    </Container>
  )
}

export default Profile
