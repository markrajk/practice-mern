import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { deleteComment, updateComment } from '../../../actions/commentActions'
import { Container, MessageHeader, Message, MessageInfo } from './styles'
import PropTypes from 'prop-types'
import LeadPencilIcon from '../../Icons/LeadPencilIcon'
import BinIcon from '../../Icons/BinIcon'
import BxsSaveIcon from '../../Icons/BxsSaveIcon'

const Comment = ({ comment, match, userInfo }) => {
  const dispatch = useDispatch()

  const [edit, setEdit] = useState(false)
  const [updated, setUpdated] = useState('')

  const handleDelete = () => {
    dispatch(deleteComment(match.params.id, comment._id))
  }

  const updateHandler = (postId, commentId, comment) => {
    if (updated === '') comment = comment.comment
    dispatch(updateComment(postId, commentId, comment))
  }

  return (
    <Container>
      {comment.user && userInfo && comment.user._id === userInfo._id && (
        <MessageHeader>
          {edit && (
            <i
              onClick={(e) =>
                updateHandler(match.params.id, comment._id, updated)
              }
            >
              <BxsSaveIcon />
            </i>
          )}
          <i className="edit" onClick={(e) => setEdit(!edit)}>
            <LeadPencilIcon />
          </i>
          <i className="delete" onClick={handleDelete}>
            <BinIcon />
          </i>
        </MessageHeader>
      )}

      <Message
        edit={edit}
        suppressContentEditableWarning
        onInput={(e) => setUpdated(e.target.textContent)}
        text={comment.comment}
      />
      <MessageInfo>
        <span className="date">
          Created at{' '}
          {new Date(comment.createdAt).toLocaleString('en-us', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <Link
          to={comment.user ? `/users/${comment.user._id}` : ''}
          className="creator"
        >
          by{' '}
          {comment.user
            ? `${comment.user.firstName} ${comment.user.lastName}`
            : ''}
        </Link>
      </MessageInfo>
    </Container>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
}

export default withRouter(Comment)
