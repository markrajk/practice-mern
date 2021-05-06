import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 2em;
    font-size: 2.5em;
    color: ${theme.colors.black};
  `}
`

export const SubTitle = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 2em;
    font-size: 1.5em;
    color: ${theme.colors.black};
  `}
`

export const TextLink = styled.button`
  ${({ theme }) => css`
    font-size: 1em;
    color: blue;
  `}
`
