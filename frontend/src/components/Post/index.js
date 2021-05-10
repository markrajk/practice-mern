import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost, deletePost, updatePost } from '../../actions/postActions'
import { createComment } from '../../actions/commentActions'
import {
  Container,
  Message,
  MessageInfo,
  CommentInput,
  Footer,
  FooterButton,
} from './styles'
import Loader from '../Loader'
import Comment from './Comment'

const Post = ({ match, history }) => {
  const dispatch = useDispatch()
  const getPostData = useSelector((state) => state.getPost)
  const { post, loading } = getPostData

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updatedPost = useSelector((state) => state.updatePost)
  const { success } = updatedPost

  const createdComment = useSelector((state) => state.createComment)
  const { success: createCommentSuccess } = createdComment

  const updatedComment = useSelector((state) => state.updateComment)
  const { success: updateCommentSuccess } = updatedComment

  const deletedComment = useSelector((state) => state.deleteComment)
  const { success: deleteCommentSuccess } = deletedComment

  const [updated, setUpdated] = useState('')
  const [edit, setEdit] = useState(false)
  const [writeComment, setWriteComment] = useState(false)
  const [comment, setComment] = useState('')

  const handleDelete = async (id) => {
    await dispatch(deletePost(id))
    history.push('/')
  }

  const handleUpdate = async (id, message) => {
    if (message === '') {
      message = post.message
    }
    dispatch(updatePost(id, message))
    setEdit(false)
  }

  const handleCommentSubmit = () => {
    dispatch(createComment(match.params.id, comment))
    setWriteComment(false)
  }

  useEffect(() => {
    dispatch(getPost(match.params.id))
  }, [
    dispatch,
    success,
    createCommentSuccess,
    updateCommentSuccess,
    deleteCommentSuccess,
    match.params.id,
  ])

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
            <Link
              to={post.user ? `/users/${post.user._id}` : ''}
              className="creator"
            >
              by{' '}
              {post.user ? `${post.user.firstName} ${post.user.lastName}` : ''}
            </Link>
          </MessageInfo>

          <Footer>
            <FooterButton
              comment
              text="Comment"
              onClick={(e) => setWriteComment(!writeComment)}
            />
            {post.user && userInfo && post.user._id === userInfo._id && (
              <>
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
              </>
            )}
          </Footer>

          <CommentInput style={{ display: writeComment ? 'block' : 'none' }}>
            <input
              type="text"
              placeholder="Write comment..."
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <div>
              <FooterButton
                comment
                text="Cancel"
                onClick={(e) => setWriteComment(false)}
              />
              <FooterButton update text="Send" onClick={handleCommentSubmit} />
            </div>
          </CommentInput>

          <div className="comments">
            {post.comments &&
              post.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  match={match}
                  comment={comment}
                  userInfo={userInfo}
                />
              ))}
          </div>
        </Container>
      )}
    </>
  )
}

export default Post
