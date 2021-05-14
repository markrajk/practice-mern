import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-left: 1.5em;
  position: relative;
`

export const DropdownButton = styled.div`
  position: relative;
  font-size: 2em;
  color: white;
  cursor: pointer;
`

export const DropdownButtonNotification = styled.span`
  ${({ theme }) => css`
    padding: 0.2rem;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 1.6em;
    min-height: 1.6em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: white;
    background-color: ${theme.colors.red};
    border-radius: 100vh;
    transform: translate(50%, -40%);
  `}
`

export const DropdownMenu = styled.div`
  ${({ theme }) => css`
    padding: 2em;
    min-width: 25em;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(0, 100%);
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
  `}
`

export const DropdownMenuItem = styled.div`
  ${({ theme }) => css`
    padding: 1em 0;

    &:not(:last-of-type) {
      border-bottom: 1px solid #000;
    }

    & p {
      padding-bottom: 0.6em;
      font-size: 1.2em;
      letter-spacing: 0.15px;
      line-height: 1.4;

      & span {
        font-weight: 600;
      }
    }

    & .buttons {
      display: flex;
      align-items: center;
      /* justify-content: flex-end; */

      & button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 1em;
        border-radius: 5px;
        font-weight: 1.3em;
        letter-spacing: 0.15px;
        color: white;
        font-weight: 600;
        border: 0;
        outline: none;
        background-color: ${theme.colors.blue};
        cursor: pointer;

        &.delete {
          margin-right: 0.5em;
          background-color: ${theme.colors.red};
        }
      }
    }
  `}
`
