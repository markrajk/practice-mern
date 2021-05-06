import styled, { css } from 'styled-components'

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 3px 5px 0 #999;
`
export const Nav = styled.nav`
  ${({ theme }) => css`
    padding: 0 4em;
    width: 100%;
    height: 6em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${theme.colors.black};
  `}
`

export const NavLink = styled.button`
  ${({ theme }) => css`
    margin-left: 1.8em;
    font-size: 1.5em;
    font-weight: 500;
    color: ${theme.colors.white};
    background-color: transparent;
    border: 0;
    outline: none;
    cursor: pointer;

    & a {
      color: inherit;
      text-decoration: inherit;
    }

    &:hover {
      text-decoration: underline;
    }
  `}
`
