/* eslint-disable @next/next/no-img-element */
import 'react-image-crop/dist/ReactCrop.css';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ReactCrop, { type PixelCrop } from 'react-image-crop';

import { Button } from '@/components/DesignSystem/Button';
import { Modal } from '@/components/DesignSystem/Modal';
import { Text } from '@/components/DesignSystem/Text';
import ThumbnailIcon from '@/public/images/icons/thumbnail.svg';

import * as Styled from './styled';

const AVATAR_WIDTH = 200;
const AVATAR_HEIGHT = 230;
const MAX_AVATAR_WIDTH = AVATAR_WIDTH * 3;
const MAX_AVATAR_HEIGHT = AVATAR_HEIGHT * 3;

const cropOptions = {
  x: 0,
  y: 0,
  width: AVATAR_WIDTH,
  height: AVATAR_HEIGHT,
  minWidth: AVATAR_WIDTH,
  minHeight: AVATAR_HEIGHT,
  aspect: AVATAR_WIDTH / AVATAR_HEIGHT,
  unit: 'px' as PixelCrop['unit'],
};

export function AvatarModal({
  isOpen,
  closeAvatarModal,
  onAvatarSave,
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
}) {
  const t = useTranslations('characters');
  const [crop, setCrop] = useState<PixelCrop>(cropOptions);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const maxImageSize = getMaxSize(imageSize);

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

  if (!isOpen) {
    return null;
  }

  return (
    <Modal onClose={handleModalClose}>
      {!base64Image && (
        <>
          <Text as="h1">{t('character-editor.avatar-modal.step-1.title')}</Text>
          <Text as="p" size="sm">
            {t('character-editor.avatar-modal.step-2.help')}
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

function getMaxSize(size: { width: number; height: number } | null) {
  if (!size) return { maxWidth: MAX_AVATAR_WIDTH, maxHeight: MAX_AVATAR_HEIGHT };

  if (size.width < MAX_AVATAR_WIDTH && size.height < MAX_AVATAR_HEIGHT) {
    return {
      maxWidth: size.width,
      maxHeight: size.height,
    };
  }

  if (size.width > size.height) {
    return {
      maxWidth: MAX_AVATAR_WIDTH,
      maxHeight: (MAX_AVATAR_WIDTH * size.height) / size.width,
    };
  }

  return {
    maxWidth: (MAX_AVATAR_HEIGHT * size.width) / size.height,
    maxHeight: MAX_AVATAR_HEIGHT,
  };
}
