import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  Container,
  ProfileImage,
  Title,
  SubTitle,
  TextLink,
  Buttons,
  Editable,
} from './styles.js'
import { updateMe, getUser } from '../../actions/userActions'
import Wall from '../Wall'
import Modal from '../Modal'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const Profile = ({ history, match }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: userInfoLogin } = userLogin

  const gotUser = useSelector((state) => state.getUser)
  const { userInfo } = gotUser

  const updatedMe = useSelector((state) => state.updateMe)
  const { success } = updatedMe

  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [openModal, setOpenModal] = useState(false)

  const [photo, setPhoto] = useState(null)
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 })
  const [src, setSrc] = useState(null)

  const imgRef = useRef(null)

  const handleImageUpload = (e) => {
    //saveHandler(file)
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setSrc(reader.result))

      setOpenModal(true)

      reader.readAsDataURL(e.target.files[0])
      e.target.value = ''
    }
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img

    const aspect = 1 / 1
    const width = img.width < img.height ? 100 : (img.height / img.width) * 100
    const height = img.width > img.height ? 100 : (img.width / img.height) * 100
    const y = (100 - height) / 2
    const x = (100 - width) / 2

    setCrop({
      unit: '%',
      width,
      // height,
      x,
      y,
      aspect,
    })

    return false // Return false if you set crop state in here.
  }, [])

  function getCroppedImg(image, crop, fileName) {
    console.log(crop, 'FROM GET COPPED')
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileName
          resolve(blob)
        },
        'image/jpeg',
        1
      )
    })
  }

  const modalConfirmHandler = async () => {
    const croppedImg = await getCroppedImg(imgRef.current, crop, 'fileName')
    setPhoto(croppedImg)
    setOpenModal(false)
  }
  const modalCancelHandler = () => {
    setSrc(null)
    setOpenModal(false)
  }

  const saveHandler = () => {
    const user = {
      firstName: firstName || userInfoLogin.firstName,
      lastName: lastName || userInfoLogin.lastName,
      email: email || userInfoLogin.email,
      photo: photo || undefined,
    }

    dispatch(updateMe(user))
    setEdit(!edit)
  }

  useEffect(() => {
    const getUserStart = async () => {
      await dispatch(getUser(match.params.id))
    }

    getUserStart()
  }, [dispatch, history, match, success])

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
    <>
      <Wrapper>
        <Container>
          {userInfo && (
            <>
              <ProfileImage
                src={`/img/users/${userInfo.photoLg}`}
                alt={userInfo.fullName}
              />
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
              {userInfo && userInfoLogin && userInfoLogin._id === userInfo._id && (
                <Buttons>
                  {!edit ? (
                    <TextLink onClick={() => setEdit(!edit)}>Update</TextLink>
                  ) : (
                    <>
                      <TextLink onClick={saveHandler}>Save</TextLink>
                      <TextLink>
                        <label htmlFor="uploadImage">Upload Photo</label>
                        <input
                          type="file"
                          name="uploadImage"
                          id="uploadImage"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e)}
                        />
                      </TextLink>
                    </>
                  )}
                </Buttons>
              )}
            </>
          )}
          <Link to={userInfo && `/users/${userInfo._id}/charts`}>
            <h1 style={{ marginBottom: '15px' }}>Charts</h1>
          </Link>
          <h1 style={{ marginBottom: '15px' }}>Teams:</h1>
          {/* {userInfo && userInfo.member && userInfo.member[0] ? (
          <>
            {userInfo.member.map((team) => (
              <h2 style={{ marginBottom: '10px' }}>
                <Link to={`/teams/${team._id}`}>{team.name}</Link>
              </h2>
            ))}
          </>
        ) : (
          <>{!loading && <h2>Currently not part of any team</h2>}</>
        )} */}
          {userInfo && userInfo.member && userInfo.member[0] && (
            <>
              {userInfo.member.map((team) => (
                <h2 key={team._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/teams/${team._id}`}>{team.name} (member)</Link>
                </h2>
              ))}
            </>
          )}

          {userInfo && userInfo.admin && userInfo.admin[0] && (
            <>
              {userInfo.admin.map((team) => (
                <h2 key={team._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/teams/${team._id}`}>{team.name} (admin)</Link>
                </h2>
              ))}
            </>
          )}

          {userInfo && userInfo.owner && userInfo.owner[0] && (
            <>
              {userInfo.owner.map((team) => (
                <h2 key={team._id} style={{ marginBottom: '10px' }}>
                  <Link to={`/teams/${team._id}`}>{team.name} (owner)</Link>
                </h2>
              ))}
            </>
          )}

          {/* {(userInfo && userInfo.member && userInfo.member[0] && (
          <>
            {userInfo.member.map((team) => (
              <h2 style={{ marginBottom: '10px' }}>
                <Link to={`/teams/${team._id}`}>{team.name} (member)</Link>
              </h2>
            ))}
          </>
        )) ||
          (userInfo && userInfo.admin && userInfo.admin[0] && (
            <>
              {userInfo.admin.map((team) => (
                <h2 style={{ marginBottom: '10px' }}>
                  <Link to={`/teams/${team._id}`}>{team.name} (admin)</Link>
                </h2>
              ))}
            </>
          )) ||
          (userInfo && userInfo.owner && userInfo.owner[0] && (
            <>
              {userInfo.owner.map((team) => (
                <h2 style={{ marginBottom: '10px' }}>
                  <Link to={`/teams/${team._id}`}>{team.name} (owner)</Link>
                </h2>
              ))}
            </>
          )) || <>{!loading && <h2>Currently not part of any team</h2>}</>} */}
        </Container>
        <Wall />
      </Wrapper>
      <Modal
        confirm={modalConfirmHandler}
        cancel={modalCancelHandler}
        open={openModal}
        setOpen={setOpenModal}
        title="Update Profile Image"
        buttons={['cancel', 'confirm']}
      >
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(newCrop) => setCrop(newCrop)}
        />
      </Modal>
    </>
  )
}

export default Profile
