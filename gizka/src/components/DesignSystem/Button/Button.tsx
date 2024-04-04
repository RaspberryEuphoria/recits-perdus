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
};

export function Button({ children, ...props }: ButtonProps) {
  if (props.isLoading) {
    return (
      <Styled.Button {...props} isLoading>
        <LoadingIcon />
        {children}
      </Styled.Button>
    );
  }

  return <Styled.Button {...props}>{children}</Styled.Button>;
}
