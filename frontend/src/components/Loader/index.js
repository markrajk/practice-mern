import React from 'react'
import { Container } from './styles'
import BeatLoader from 'react-spinners/BeatLoader'

const Loader = ({ loading, css }) => {
  return (
    <Container>
      <BeatLoader color={'#FFFFFF'} loading={loading} size={15}></BeatLoader>
    </Container>
  )
}

export default Loader
