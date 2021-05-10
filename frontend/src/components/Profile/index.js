import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Wrapper,
  Container,
  Title,
  SubTitle,
  TextLink,
  Buttons,
  Editable,
} from './styles.js'
import { updateMe, getUser } from '../../actions/userActions'
import Wall from '../Wall'

const Profile = ({ history, match }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: userInfoLogin } = userLogin

  const gotUser = useSelector((state) => state.getUser)
  const { userInfo } = gotUser

  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const saveHandler = () => {
    dispatch(updateMe(firstName, lastName, email))
    setEdit(!edit)
  }

  useEffect(() => {
    const getUserStart = async () => {
      await dispatch(getUser(match.params.id))
    }

    getUserStart()
  }, [dispatch, history, match])

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push('/login')
  //   } else {

  // setFirstName(userInfo.firstName)
  // setLastName(userInfo.lastName)
  // setEmail(userInfo.email)
  //   }
  // }, [userInfo, dispatch, history])

  return (
    <Wrapper>
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
            {userInfo &&
              userInfoLogin &&
              userInfoLogin._id === userInfo._id && (
                <Buttons>
                  {!edit ? (
                    <TextLink onClick={() => setEdit(!edit)}>Update</TextLink>
                  ) : (
                    <TextLink onClick={saveHandler}>Save</TextLink>
                  )}
                </Buttons>
              )}
          </>
        )}
      </Container>
      <Wall />
    </Wrapper>
  )
}

export default Profile
