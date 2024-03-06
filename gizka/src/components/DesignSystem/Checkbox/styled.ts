import styled from 'styled-components';

export const Checkmark = styled.span`
  border: 2px dashed currentColor;
  border-radius: var(--rounded);
  height: 25px;
  transition: background-color 0.2s ease-in-out;
  width: 25px;

  &:after {
    content: '';
    display: none;
    position: absolute;
  }
`;

export const Checkbox = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;

export const Container = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
  user-select: none;

  &:hover ${Checkbox} ~ ${Checkmark} {
    border-style: solid;
  }

  ${Checkbox}:checked ~ ${Checkmark} {
    background: var(--dark-05);
    border-style: solid;
  }

  ${Checkbox}:checked ~ ${Checkmark}:after {
    display: block;
  }

  ${Checkbox} ~ ${Checkmark}:after {
    border: solid currentColor;
    border-width: 0 3px 3px 0;
    height: 10px;
    left: 9px;
    top: 5px;
    transform: rotate(45deg);
    width: 5px;
  }
`;
