import Link from 'next/link';
import styled from 'styled-components';

import { Media } from '@/utils/constants';

export const Title = styled.span`
  font-family: 'Philosopher';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const SubTitle = styled.span`
  font-family: 'Philosopher';
  font-weight: normal;
  color: var(--flashy-alt);
  font-size: 0.9rem;
`;

export const Description = styled.span`
  margin-top: 1rem;
  font-family: 'Philosopher';
  font-weight: normal;
  width: calc(100% - 40px * 2); // Let some space for the avatar
`;

export const Card = styled(Link)<{ background?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background-image: ${(props) => props.background && `url(${props.background}),`}
    linear-gradient(43deg, var(--flashy-02) 0%, var(--flashy-08) 46%, var(--flashy-05) 100%);
  background-size: cover, auto, auto, auto;
  box-shadow: 0px 0px 10px 0px var(--flashy-05), inset 0px 0px 10px 0px var(--flashy-05);
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  color: var(--light);
  font-weight: bold;
  text-shadow: var(--primary) 1px 0 10px;
  text-decoration: none;
  text-align: center;
  overflow: hidden;
  height: 100%;
  aspect-ratio: 3 / 1;

  &:hover {
    box-shadow: 0px 0px 10px 0px var(--flashy), inset 0px 0px 10px 0px var(--flashy);

    ${Title}, ${Description} {
      color: var(--light);
    }
  }

  @media (max-width: ${Media.md}) {
    grid-column: 1 / -1;
  }
`;

export const Icon = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;

  width: 40px;
  height: 40px;

  img {
    border-radius: 0 var(--rounded) var(--rounded) 0;
    border: 1px solid var(--flashy);
    border-left: 0;
    border-bottom: 0;
  }
`;
