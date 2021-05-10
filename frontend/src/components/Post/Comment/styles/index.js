import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 1em 0;
    border-top: 1px solid ${theme.colors.black};
  `}
`

export const MessageHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & i {
      margin-right: 0.5em;
      font-size: 2.5em;
      cursor: pointer;
      transition: all 0.1s ease-in-out;

      &:hover {
        transform: scale(1.15);
      }

      &.delete {
        margin-right: 0;
        color: ${theme.colors.red};
      }

      &.edit {
        color: ${theme.colors.blue};
      }
    }
  `}
`

export const StyledMessage = styled.p`
  ${({ theme }) => css`
    margin-bottom: 0.5em;
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
      focus={edit}
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
