import styled from 'styled-components';

export const ImageUpload = styled.div`
  background: var(--dark-05);
  border-radius: var(--rounded);
  display: flex;
  padding: var(--space-05);
  margin: var(--space-05);

  input {
    display: none;
  }
`;

export const ImageUploadLabel = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
  margin: auto;
  padding: var(--space-05);
`;

export const ImageUploadIcon = styled.div`
  align-items: center;
  background: var(--dark);
  border-radius: 50%;
  color: var(--flashy);
  display: flex;
  height: 150px;
  justify-content: center;
  width: 150px;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const InitialImage = styled.div<{
  width: number;
  height: number;
}>`
  height: 230px;
  width: 680px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

export const AvatarPreview = styled.div<{
  width?: number;
  height?: number;
  maxWidth: number;
  maxHeight: number;
}>`
  min-width: 200px;
  min-height: 230px;
  width: ${({ width }) => width || 200}px;
  height: ${({ height }) => height || 230}px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  max-height: ${({ maxHeight }) => maxHeight}px;
  position: relative;
  margin: var(--space-05) auto;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-05);
  width: 100%;
`;
