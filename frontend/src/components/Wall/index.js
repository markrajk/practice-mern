import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPosts, createPost } from '../../actions/postActions'
import { Container, PostCard, CreatePostButton, PostModal } from './styles'
import Loader from '../Loader'
import { POST_CREATE_RESET } from '../../constants/postConstants'

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update the state to force render
}

const Wall = ({ history }) => {
  const forceUpdate = useForceUpdate()
  const dispatch = useDispatch()
  const postList = useSelector((state) => state.postList)
  const { posts } = postList

  const [modalOpen, setModalOpen] = useState(false)
  const [postMessage, setPostMessage] = useState(true)

  const submitHandler = () => {
    dispatch(createPost(postMessage))
    setModalOpen(false)
    forceUpdate()
  }

  useEffect(() => {
    dispatch(listPosts())
  }, [dispatch])

  return (
    <>
      <Container>
        <CreatePostButton onClick={(e) => setModalOpen(true)}>
          Create New Post
        </CreatePostButton>
        {posts.length ? (
          posts.map((post) => (
            <PostCard key={post._id}>
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
