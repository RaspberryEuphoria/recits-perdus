import styled from 'styled-components';

import HoloEffect from '@/public/images/holo_effect.png';

export const IllustrationPreview = styled.div`
  border: 1px solid var(--flashy);
  border-radius: var(--rounded);
  box-shadow: 0 0 10px var(--flashy), inset 0 0 10px var(--flashy);
  position: relative;

  &::after {
    background-image: url(${HoloEffect.src});
    content: '';
    display: block;
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
  }

  img {
    border-radius: var(--rounded);
    display: block;
    filter: grayscale(30%);
    height: auto;
    width: 100%;
  }
`;
