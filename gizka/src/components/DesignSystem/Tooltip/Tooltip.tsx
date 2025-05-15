import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as Styled from './styled';

type TooltipProps = {
  content: React.ReactNode | string;
  children: React.ReactNode;
};

export function Tooltip(props: TooltipProps) {
  const { content, children } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const displayContent = (e: React.MouseEvent) => {
    setIsVisible(true);

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    setPosition({
      top: rect.top + rect.height + 15,
      left: rect.left,
    });
  };

  const hideContent = () => {
    setIsVisible(false);
    setPosition({ top: 0, left: 0 });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        hideContent();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  if (!content) {
    return children;
  }

  return (
    <Styled.Tooltip onMouseEnter={displayContent} onMouseLeave={hideContent}>
      {children}
      {isVisible &&
        createPortal(
          <Styled.Content style={{ ...position }}>{content}</Styled.Content>,
          document.body,
        )}
    </Styled.Tooltip>
  );
}
