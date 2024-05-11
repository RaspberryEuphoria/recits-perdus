/* eslint-disable @next/next/no-img-element */
import 'react-image-crop/dist/ReactCrop.css';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import ReactCrop, { type PixelCrop } from 'react-image-crop';

import { Button } from '@/components/DesignSystem/Button';
import { Modal } from '@/components/DesignSystem/Modal';
import { Text } from '@/components/DesignSystem/Text';
import ThumbnailIcon from '@/public/images/icons/thumbnail.svg';

import * as Styled from './styled';

const HARD_MAX_SIZE = 1000;

export function AvatarModal({
  isOpen,
  closeAvatarModal,
  onAvatarSave,
  targetWidth,
  targetHeight,
}: {
  isOpen: boolean;
  closeAvatarModal: () => void;
  onAvatarSave: (
    crop: {
      x: number;
      y: number;
      width: number;
      height: number;
    },
    base64Image: string,
  ) => void;
  targetWidth: number;
  targetHeight: number;
}) {
  const MAX_AVATAR_WIDTH = useMemo(() => Math.min(HARD_MAX_SIZE, targetWidth * 3), [targetWidth]);
  const MAX_AVATAR_HEIGHT = useMemo(
    () => Math.min(HARD_MAX_SIZE, targetHeight * 3),
    [targetHeight],
  );

  const t = useTranslations('characters');

  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [maxAllowedSize, setMaxAllowedSize] = useState({
    width: MAX_AVATAR_WIDTH,
    height: MAX_AVATAR_HEIGHT,
  });
  const maxImageSize = getMaxSize(imageSize, maxAllowedSize);

  const cropOptions = useMemo(() => {
    const width = imageSize
      ? Math.min(maxImageSize.maxWidth, imageSize.width, targetWidth)
      : targetWidth;
    const height = imageSize
      ? Math.min(maxImageSize.maxHeight, imageSize.height, targetHeight)
      : targetHeight;

    return {
      x: 0,
      y: 0,
      width,
      height,
      minWidth: width,
      minHeight: height,
      aspect: width / height,
      unit: 'px' as PixelCrop['unit'],
    };
  }, [imageSize, maxImageSize.maxHeight, maxImageSize.maxWidth, targetHeight, targetWidth]);
  const [crop, setCrop] = useState<PixelCrop>(cropOptions);

  const clearAvatar = () => {
    setBase64Image(null);
    setImageSize(null);
    setCrop(cropOptions);
  };

  const saveAvatar = () => {
    if (!base64Image || !imageSize) return;

    const resizeRatio =
      Math.max(maxImageSize.maxWidth, imageSize.width) /
      Math.min(maxImageSize.maxWidth, imageSize.width);

    onAvatarSave(
      {
        x: crop.x * resizeRatio,
        y: crop.y * resizeRatio,
        width: crop.width * resizeRatio,
        height: crop.height * resizeRatio,
      },
      base64Image,
    );

    clearAvatar();
    closeAvatarModal();
  };

  const handleModalClose = () => {
    clearAvatar();
    closeAvatarModal();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) {
      setBase64Image(null);
      return;
    }

    const [file] = files;
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const windowWidth = window.innerWidth * 0.75;
    const windowHeight = window.innerHeight * 0.75;

    if (windowWidth < maxAllowedSize.width && windowHeight > maxAllowedSize.height) {
      setMaxAllowedSize({ width: windowWidth, height: maxAllowedSize.height });
    } else if (windowWidth > maxAllowedSize.width && windowHeight < maxAllowedSize.height) {
      setMaxAllowedSize({ width: maxAllowedSize.width, height: windowHeight });
    } else if (windowWidth < maxAllowedSize.width && windowHeight < maxAllowedSize.height) {
      setMaxAllowedSize({ width: windowWidth, height: windowHeight });
    }
  }, [maxAllowedSize.height, maxAllowedSize.width]);

  useEffect(() => {
    setCrop(cropOptions);
  }, [
    cropOptions,
    imageSize,
    maxImageSize.maxHeight,
    maxImageSize.maxWidth,
    targetHeight,
    targetWidth,
  ]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal onClose={handleModalClose}>
      {!base64Image && (
        <>
          <Text as="h1">{t('character-editor.avatar-modal.step-1.title')}</Text>
          <Text as="p" size="sm">
            {t('character-editor.avatar-modal.step-2.help', {
              width: targetWidth,
              height: targetHeight,
            })}
          </Text>

          <Styled.ImageUpload>
            <input
              type="file"
              id="avatar"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
            <Styled.ImageUploadLabel htmlFor="avatar">
              <Styled.ImageUploadIcon>
                <ThumbnailIcon />
              </Styled.ImageUploadIcon>
              {t('character-editor.avatar-modal.step-1.upload')}
            </Styled.ImageUploadLabel>
          </Styled.ImageUpload>
        </>
      )}
      {base64Image && (
        <>
          <Text as="h1">{t('character-editor.avatar-modal.step-2.title')}</Text>
          <Styled.AvatarPreview
            width={imageSize?.width}
            height={imageSize?.height}
            {...maxImageSize}
          >
            <ReactCrop
              crop={crop}
              onChange={setCrop}
              aspect={cropOptions.aspect}
              minHeight={cropOptions.minHeight}
              minWidth={cropOptions.minWidth}
            >
              <img
                src={base64Image}
                alt="Avatar"
                onLoad={({ target }) => {
                  const { naturalWidth, naturalHeight } = target as HTMLImageElement;
                  setImageSize({ width: naturalWidth, height: naturalHeight });
                }}
              />
            </ReactCrop>
          </Styled.AvatarPreview>
          <Styled.Buttons>
            <Button onClick={clearAvatar} variant="small" outline>
              {t('character-editor.avatar-modal.step-2.cancel')}
            </Button>
            <Button onClick={saveAvatar} variant="small">
              {t('character-editor.avatar-modal.step-2.save')}
            </Button>
          </Styled.Buttons>
        </>
      )}
    </Modal>
  );
}

function getMaxSize(
  size: { width: number; height: number } | null,
  maxAllowedSize: { width: number; height: number },
) {
  if (!size) return { maxWidth: maxAllowedSize.width, maxHeight: maxAllowedSize.height };

  if (size.width < maxAllowedSize.width && size.height < maxAllowedSize.height) {
    return {
      maxWidth: size.width,
      maxHeight: size.height,
    };
  }

  if (size.width > size.height) {
    return {
      maxWidth: maxAllowedSize.width,
      maxHeight: (maxAllowedSize.width * size.height) / size.width,
    };
  }

  return {
    maxWidth: (maxAllowedSize.height * size.width) / size.height,
    maxHeight: maxAllowedSize.height,
  };
}
