import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 2em;
    max-width: 50em;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;
    background-color: ${theme.colors.white};
    border: 1px solid #ccc;
    box-shadow: 5px 5px 15px 5px #959595;
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 1em;
    font-size: 2em;
    color: ${theme.colors.black};
  `}
`
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & input {
    width: 49%;
  }
`

export const Input = styled.input`
  ${({ theme }) => css`
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
  `}
`

export const CardButton = styled.button`
  ${({ theme }) => css`
    margin-bottom: 1em;
    padding: 1em;
    width: 100%;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4em;
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};
    border: 1px solid ${theme.colors.black};
    border-radius: 8px;
    outline: none !important;
    cursor: pointer;
  `}
`

export const Info = styled.p`
  margin-bottom: 2em;
  font-size: 1.2em;
`
