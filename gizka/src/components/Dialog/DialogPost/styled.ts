import styled from 'styled-components';

export const Avatar = styled.div`
  display: none;
`;

export const DialogPost = styled.p`
  margin: 4rem 0;
  line-height: 2rem;
  font-size: 1.4rem;
  font-family: 'Kontrapunkt-Light';
  text-shadow: 0 0 3px var(--primary), 1px 1px 3px var(--primary);

  &:first-of-type {
    margin-top: 0;
    text-align: center;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    & ${Avatar} {
      display: block;
      transform: translateX(-30%);
    }
  }
`;
