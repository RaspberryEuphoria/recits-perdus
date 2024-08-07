import LoadingIcon from '@/public/images/icons/loading.svg';

import * as Styled from './styled';

type ButtonProps = {
  variant?: 'small';
  width?: string;
  outline?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  tabIndex?: number;
};

export function Button({ children, ...props }: ButtonProps) {
  if (props.isLoading) {
    return (
      <Styled.Border width={props.width}>
        <Styled.Button {...props} isLoading>
          <LoadingIcon />
          {children}
        </Styled.Button>
      </Styled.Border>
    );
  }

  return (
    <Styled.Border width={props.width} isDisabled={props.disabled}>
      <Styled.Button {...props}>{children}</Styled.Button>
    </Styled.Border>
  );
}
