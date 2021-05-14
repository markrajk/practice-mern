import React from 'react'
import {
  Container,
  Backdrop,
  ModalContainer,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalButton,
} from './styled'
import CrossIcon from '../Icons/CrossIcon'
import PropTypes from 'prop-types'

const Modal = ({ open, setOpen, title, buttons, children }) => {
  const setOpenHandler = (bool) => {
    setOpen(bool)
  }
  return (
    <Container style={{ display: open ? 'block' : 'none' }}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <i onClick={(e) => setOpenHandler(false)}>
            <CrossIcon />
          </i>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {buttons.map((button) => (
            <ModalButton
              className={button}
              onClick={(e) => button === 'cancel' && setOpenHandler(false)}
            >
              {button}
            </ModalButton>
          ))}
        </ModalFooter>
      </ModalContainer>
      <Backdrop />
    </Container>
  )
}
Modal.prototype = {
  title: PropTypes.string.isRequired,
  button: PropTypes.array.isRequired,
  setOpen: PropTypes.func.isRequired,
}
export default Modal
