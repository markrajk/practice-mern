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
export const Header = styled.div`
  ${({ theme }) => css`
    margin-bottom: 2em;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & i {
      margin-left: 0.6em;
      font-size: 2.5em;
    }

    & button {
      display: inline-block;
      margin-left: auto;
      padding: 0.6em 1.2em;
      font-size: 1.6em;
      font-weight: 600;
      color: ${theme.colors.white};
      background-color: ${theme.colors.red};
      border-radius: 5px;
      border: 0;
      outline: none;
      cursor: pointer;
    }
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: 3em;
    color: ${theme.colors.black};
    letter-spacing: 0.5px;
  `}
`
export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    text-align: left;
    border: 1px solid black;
    border-collapse: collapse;

    & th,
    td {
      padding: 0.5rem 1rem;
    }

    & thead {
      & th {
        font-size: 1.4em;
        font-weight: 600;
        letter-spacing: 0.15px;
        color: ${theme.colors.white};
        background-color: ${theme.colors.black};
        border: 1px solid black;
      }
    }

    & tbody {
      & td {
        font-size: 1.4em;
        font-weight: 500;
        border: 1px solid black;

        & a {
          color: ${theme.colors.black};
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        & button {
          display: block;
          margin: 0 auto;
          padding: 0.4em 1em;
          font-size: 1em;
          font-weight: 600;
          color: ${theme.colors.white};
          letter-spacing: 0.25px;
          border-radius: 5px;
          border: 0;
          outline: none;
          cursor: pointer;

          &.delete {
            background-color: ${theme.colors.red};
          }
        }
      }
    }
  `}
`
