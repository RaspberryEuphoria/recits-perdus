import createHttpError from 'http-errors';
import sharp from 'sharp';

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const MAX_DIMENSION = 4000;
const MAX_INPUT_PIXELS = 50_000_000;

function toBoundedInt(value: unknown, name: string, min: number, max = MAX_DIMENSION) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < min || n > max) {
    throw createHttpError.BadRequest(`Invalid image ${name}`);
  }
  return n;
}

export async function cropImage(
  base64Image: string,
  crop: Crop,
  targetWidth: number,
  targetHeight: number,
) {
  if (typeof base64Image !== 'string' || !base64Image) {
    throw createHttpError.BadRequest('Missing image');
  }
  if (!crop || typeof crop !== 'object') {
    throw createHttpError.BadRequest('Missing crop');
  }

  const extract = {
    left: toBoundedInt(crop.x, 'crop x', 0, MAX_INPUT_PIXELS),
    top: toBoundedInt(crop.y, 'crop y', 0, MAX_INPUT_PIXELS),
    width: toBoundedInt(crop.width, 'crop width', 1, 20_000),
    height: toBoundedInt(crop.height, 'crop height', 1, 20_000),
  };

  return await sharp(Buffer.from(base64Image, 'base64'), { limitInputPixels: MAX_INPUT_PIXELS })
    .extract(extract)
    .resize(toBoundedInt(targetWidth, 'width', 1), toBoundedInt(targetHeight, 'height', 1))
    .png()
    .toBuffer();
}
