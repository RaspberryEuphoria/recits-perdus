import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FormRow = styled.div<{ marginY?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: ${(props) => (props.marginY ? `${props.marginY}rem 0` : '0')};
  margin-bottom: 1rem;
  width: 100%;
`;

export const Help = styled.div`
  background: var(--secondary);
  border-radius: var(--rounded);
  color: var(--flashy-alt);
  padding: var(--space-05);

  p {
    color: var(--light);
    margin: var(--space-05) 0;
    font-size: 0.8rem;
  }
`;

export const Label = styled.label`
  align-items: center;
  color: var(--flashy-alt);
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  gap: var(--space-05);
  justify-content: center;
`;

export const Mandatory = styled.span`
  color: var(--light);
  font-size: 0.8rem;
  font-weight: normal;
`;
