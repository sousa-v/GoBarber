import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 14.4rem;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      max-width: 112rem;
      margin: 0 auto;
      width: 100%;

      svg {
        color: #999591;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -17.6rem auto 0;

  width: 100%;

  form {
    margin: 8rem 0;
    width: 32rem;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 2.4rem;
      font-size: 2rem;
      text-align: left;
    }

    > div {
      margin-bottom: 2rem;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 3.2rem;
  position: relative;
  align-self: center;

  img {
    width: 18.6rem;
    height: 18.6rem;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 4.8rem;
    height: 4.8rem;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
