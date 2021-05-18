import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    margin: 0 2.5em 2.5em 0;
    background-color: ${theme.colors.white};
    box-shadow: ${theme.boxShadow};
    border-radius: ${theme.borderRadius};
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 2em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & i {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 2.5em;
      color: ${theme.colors.black};
      transform: translate(-50%, 50%);
      cursor: pointer;
      transition: all 0.1s ease-in-out;

      &:hover {
        transform: translate(-50%, 50%) scale(1.1);
      }

      &:active {
        opacity: 0.5;
      }
    }
  `}
`

export const Title = styled.p`
  ${({ theme }) => css`
    padding: 0;
    font-size: 2.5em;
    font-weight: 700;
    color: ${theme.colors.black};
    border: 0;
    outline: 0;
  `}
`

export const Body = styled.div`
  padding: 0 2em 2em;
`
