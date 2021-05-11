import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 3em 4em;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
  `}
`

export const ContentWrapper = styled.div`
  max-width: 70em;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
    margin-bottom: 3em;
    font-size: 1.8em;
    color: ${theme.colors.black};
    opacity: 0.8;
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    display: block;
    margin-bottom: 1rem;
    font-size: 1.6em;
    font-weight: 600;
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

export const Button = styled.button`
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

export const SubmitButton = styled.button`
  ${({ theme }) => css`
    margin-top: auto;
    margin-left: auto;
    padding: 0.6em 1.2em;
    font-size: 1.6em;
    font-weight: 600;
    color: ${theme.colors.white};
    background-color: ${theme.colors.blue};
    border-radius: 5px;
    border: 0;
    outline: none;
  `}
`
