import Link from 'next/link';
import styled from 'styled-components';

export const PartnersList = styled.div`
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
`;

export const Partner = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 30%;
  padding: 1rem;
  background: linear-gradient(
    43deg,
    var(--flashy-02) 0%,
    var(--flashy-08) 46%,
    var(--flashy-05) 100%
  );
  background-size: cover, auto, auto, auto;
  box-shadow: 0px 0px 10px 0px var(--flashy-05), inset 0px 0px 10px 0px var(--flashy-05);
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  color: inherit;
  font-weight: bold;
  text-shadow: var(--primary) 1px 0 10px;
  text-decoration: none;
  text-align: center;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 10px 0px var(--flashy), inset 0px 0px 10px 0px var(--flashy);
  }

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

export const PartnerLabel = styled.span`
  font-family: 'Philosopher';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const PartnerDescription = styled.span`
  font-family: 'Philosopher';
  font-weight: normal;
  color: var(--flashy-alt);
  font-size: 0.9rem;
`;
