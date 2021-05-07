import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost, deletePost, updatePost } from '../../actions/postActions'
import { Container, Message, MessageInfo, Footer, FooterButton } from './styles'
import Loader from '../Loader'

const Post = ({ match, history }) => {
  const dispatch = useDispatch()
  const getPostData = useSelector((state) => state.getPost)
  const { post, loading } = getPostData

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updatedPost = useSelector((state) => state.updatePost)
  const { success } = updatedPost

  const [updated, setUpdated] = useState('')
  const [edit, setEdit] = useState(false)

  const handleDelete = async (id) => {
    await dispatch(deletePost(id))
    history.push('/')
  }

  const handleUpdate = async (id, message) => {
    dispatch(updatePost(id, message))
    setEdit(false)
  }

  useEffect(() => {
    dispatch(getPost(match.params.id))
    setUpdated(post.message)
  }, [dispatch, success])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Message
            edit={edit}
            suppressContentEditableWarning
            onInput={(e) => setUpdated(e.target.textContent)}
            text={post.message}
          />
          <MessageInfo>
            <span className="date">
              Created at{' '}
              {new Date(post.createdAt).toLocaleString('en-us', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="creator">
              by{' '}
              {post.user ? `${post.user.firstName} ${post.user.lastName}` : ''}
            </span>
          </MessageInfo>

          {post.user && userInfo && post.user._id === userInfo._id && (
            <Footer>
              {!edit ? (
                <FooterButton
                  update
                  text="Edit"
                  onClick={(e) => setEdit(true)}
                />
              ) : (
                <FooterButton
                  update
                  text="Save"
                  onClick={(e) => handleUpdate(post._id, updated)}
                />
              )}

              <FooterButton
                text="Delete"
                onClick={(e) => handleDelete(post._id)}
              />
            </Footer>
          )}
        </Container>
      )}
    </>
  )
}

export default Post
