import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    text-align: center;
  `}
`

export const Container = styled.div`
  ${({ theme }) => css`
    /* width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center; */
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 1em;
    font-size: 2.5em;
    color: ${theme.colors.black};
  `}
`

export const SubTitle = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 2em;
    font-size: 2em;
    color: ${theme.colors.black};
  `}
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & button:first-of-type {
    margin-right: 1em;
  }
`

export const TextLink = styled.button`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 4rem;
    font-size: 1.4em;
    color: blue;
  `}
`

const StyledEditable = styled.span`
  display: inline-block;
  font-size: inherit;
  color: inherit;
  font-family: inherit;
  font-weight: inherit;
  background-color: transparent;
  border: ${(props) =>
    props.edit ? '1px solid black' : '1px solid transparent'};
  outline: none !important;
  border-radius: 5px;
`
export const Editable = ({ onInput, edit, children }) => {
  return (
    <StyledEditable
      edit={edit}
      suppressContentEditableWarning
      contentEditable={edit}
      onInput={onInput}
    >
      {children}
    </StyledEditable>
  )
}
