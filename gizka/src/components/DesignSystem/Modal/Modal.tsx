import * as Styled from './styled';

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Styled.Mask onMouseDown={onMouseDown}>
      <Styled.Modal>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Modal>
    </Styled.Mask>
  );
}
