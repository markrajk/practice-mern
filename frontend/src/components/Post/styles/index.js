import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2.5em;
    max-width: 70em;
    /* width: 100%; */
    border: ${theme.border};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
    background-color: ${theme.colors.white};
  `}
`

export const StyledMessage = styled.p`
  ${({ theme }) => css`
    margin-bottom: 1.5em;
    font-size: 1.5em;
    line-height: 1.4;
    letter-spacing: 0.15px;
    color: ${theme.colors.black};
  `}
`

export const Message = ({ onInput, edit, text }) => {
  return (
    <StyledMessage
      edit={edit}
      suppressContentEditableWarning
      contentEditable={edit}
      onInput={onInput}
    >
      {text}
    </StyledMessage>
  )
}

export const MessageInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & .date {
      margin-right: 0.3em;
      font-size: 1.5em;
      color: ${theme.colors.black};
      opacity: 0.8;
    }

    & .creator {
      font-size: 1.5em;
      color: ${theme.colors.black};
    }
  `}
`

export const Footer = styled.div`
  padding-top: 1.5em;
  height: 7em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const CommentInput = styled.div`
  ${({ theme }) => css`
    padding: 1em 0;
    display: none;

    & input {
      padding: 0.8em 1em;
      margin-bottom: 1em;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.4em;
      color: ${theme.colors.black};
      border-radius: 8px;
      outline: none !important;

      &::placeholder {
        opacity: 0.7;
      }
    }

    & div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  `}
`

const StyledFooterButton = styled.button`
  ${({ theme }) => css`
    padding: 0.7em 2em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6em;
    letter-spacing: 0.5px;
    font-weight: 600;
    border-radius: 5px;
    background-color: ${({ update, comment }) =>
      update ? theme.colors.blue : comment ? 'gray' : theme.colors.red};
    color: ${theme.colors.white};\
    outline: none;
    border: 0;
    cursor: pointer;
    transition: opacity .2s ease-in-out;

    &:hover {
      opacity: .85;
    }

    &:not(:last-of-type) {
      margin-right: .7em;
    }
  `}
`

export const FooterButton = ({ update, comment, text, onClick, children }) => {
  return (
    <StyledFooterButton update={update} comment={comment} onClick={onClick}>
      {text && text}
      {children}
    </StyledFooterButton>
  )
}
