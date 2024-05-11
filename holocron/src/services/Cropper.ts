import sharp from 'sharp';

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function cropImage(
  base64Image: string,
  crop: Crop,
  targetWidth: number,
  targetHeight: number,
) {
  console.log({ base64Image, crop, targetWidth, targetHeight });
  const { x, y, width, height } = crop;

  return await sharp(Buffer.from(base64Image, 'base64'))
    .extract({
      width: Math.floor(width),
      height: Math.floor(height),
      left: Math.floor(x),
      top: Math.floor(y),
    })
    .resize(targetWidth, targetHeight)
    .png()
    .toBuffer();
}
