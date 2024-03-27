'use client';

import isPropValid from '@emotion/is-prop-valid';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/** @see https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6 */
function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager enableVendorPrefixes shouldForwardProp={shouldForwardProp}>
        {children}
      </StyleSheetManager>
    );
  }

  return (
    <StyleSheetManager
      shouldForwardProp={shouldForwardProp}
      sheet={styledComponentsStyleSheet.instance}
    >
      {children}
    </StyleSheetManager>
  );
}
export function StyleProvider(props: React.PropsWithChildren) {
  return <StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>;
}
