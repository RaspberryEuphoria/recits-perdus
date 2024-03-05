import styled from 'styled-components';

type ClickToRollProps = {
  isSelected: boolean;
  variant?: 'attribute' | 'danger';
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

  ul,
  ol {
    margin: 1rem;
  }

  ul {
    list-style: inside;
  }

  ol {
    list-style: lower-roman;
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

export const Prompt = styled.span`
  color: var(--flashy);
  display: inline-block;
  font-style: italic;
  text-shadow: var(--shadow);

  &::before {
    content: '❗ ';
  }
`;

export const ClickToRoll = styled.span<ClickToRollProps>`
  align-items: center;
  border-radius: var(--rounded);
  border: 2px dashed var(--bonus);
  color: var(--bonus);
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
    border-style: solid;

    svg {
      fill: currentColor;
    }
  }

  ${(props) => {
    if (props.variant === 'danger') {
      return `
        color: var(--malus);
        border-color: var(--malus);
      `;
    }
  }}

  ${(props) => {
    if (props.isSelected) {
      return `
        background: var(--dark-05);
        border-style: solid;

        svg {
          fill: currentColor;
        }
      `;
    }
  }}
`;
