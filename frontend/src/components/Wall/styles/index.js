import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2em;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
`

export const CreatePostButton = styled.button`
  ${({ theme }) => css`
    margin: 2rem;
    padding: 0 1.7em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 7rem;
    font-size: 1.8em;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    border: 0;
    outline: 0;
    border-radius: 15px;
    cursor: pointer;
  `}
`

export const PostCard = styled.div`
  ${({ theme }) => css`
    margin: 2em;
    padding: 2.5em;
    background-color: ${theme.colors.white};
    border: 1px solid #e1e1e1;
    border-radius: 15px;
    box-shadow: 3px 3px 8px 3px #959595;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    & p {
      font-size: 1.3em;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: 0.2px;
      color: ${theme.colors.black};
    }
  `}
`

export const PostModal = styled.div`
  ${({ theme }) => css`
    padding: 2em;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    background-color: ${theme.colors.white};
    border: 1px solid #ccc;
    box-shadow: 5px 5px 15px 5px #959595;

    & input {
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
    }

    & button {
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
    }
  `}
`
