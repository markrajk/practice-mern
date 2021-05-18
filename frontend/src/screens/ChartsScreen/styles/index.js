import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 5.2rem);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
`

export const CreateButton = styled.button`
  ${({ theme }) => css`
    margin-bottom: 2rem;
    padding: 0.5em 1.2em;
    font-size: 1.6em;
    background-color: ${theme.colors.blue};
    border-radius: 5px;
    font-weight: 600;
    color: ${theme.colors.white};
  `}
`
