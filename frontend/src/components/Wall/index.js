import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPosts, createPost, deletePost } from '../../actions/postActions'
import { Container, PostCard, CreatePostButton, PostModal } from './styles'
import Loader from '../Loader'

const Wall = ({ history }) => {
  const dispatch = useDispatch()
  const postList = useSelector((state) => state.postList)
  const { posts, error, loading } = postList

  const createdPost = useSelector((state) => state.createPost)
  const { success, loading: createLoading } = createdPost

  const deletedPost = useSelector((state) => state.deletePost)
  const { success: successDelete } = deletedPost

  const [modalOpen, setModalOpen] = useState(false)
  const [postMessage, setPostMessage] = useState(true)

  const submitHandler = () => {
    dispatch(createPost(postMessage))
    setModalOpen(false)
  }

  const clickHandler = (id) => {
    history.push(`/posts/${id}`)
  }

  useEffect(() => {
    if (success || posts || successDelete) {
      dispatch(listPosts())
    }
  }, [dispatch, success, successDelete])

  // useEffect(() => {
  //   dispatch(listPosts())
  // }, [])

  return (
    <>
      <Container>
        <CreatePostButton onClick={(e) => setModalOpen(true)}>
          Create New Post
        </CreatePostButton>
        {!loading ? (
          posts.map((post) => (
            <PostCard onClick={(e) => clickHandler(post._id)} key={post._id}>
              <p>{post.message}</p>
            </PostCard>
          ))
        ) : (
          <Loader loading={true} color="#000" />
        )}
      </Container>
      <PostModal style={{ display: modalOpen ? 'block' : 'none' }}>
        <input
          type="text"
          placeholder="Enter message here..."
          onChange={(e) => setPostMessage(e.currentTarget.value)}
        />
        <button onClick={submitHandler}>Ok</button>
        <button onClick={(e) => setModalOpen(false)}>Cancel</button>
      </PostModal>
    </>
  )
}

export default Wall
