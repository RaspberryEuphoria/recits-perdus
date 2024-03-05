import styled from 'styled-components';

type ClickToRollProps = {
  isSelected: boolean;
};

export const MoveCard = styled.div`
  background: var(--secondary);
  border-radius: var(--rounded);
  padding: var(--space-1);
  line-height: 1.5rem;

  h1 {
    align-items: center;
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;
    justify-content: space-between;
    font-weight: bold;
  }

  ul {
    list-style: inside;
    margin: 1rem;
  }

  li {
    margin: 0.5rem 0;
  }
`;

export const CloseButton = styled.span`
  color: var(--error);
  cursor: pointer;
  font-size: 0.8rem;
`;

export const ClickToRoll = styled.span<ClickToRollProps>`
  align-items: center;
  border-radius: var(--rounded);
  border: 2px dashed var(--flashy);
  color: var(--flashy);
  cursor: pointer;
  display: inline-flex;
  gap: var(--space-05);
  font-weight: bold;
  padding: 0 var(--space-05);

  svg {
    fill: var(--light);
    display: inline;
    height: 20px;
    width: 20px;
  }

  &:hover {
    color: var(--flashy-alt);
    border-color: var(--flashy-alt);

    svg {
      fill: var(--flashy-alt);
    }
  }

  ${(props) => {
    if (props.isSelected) {
      return `
        color: var(--flashy-alt);
        background: var(--dark-05);
        border-color: var(--flashy-alt);
        border-style: solid;

        svg {
          fill: var(--flashy-alt);
        }
      `;
    }
  }}
`;
