import path from 'path';
import { promises as fsPromises } from 'fs';
import sharp from 'sharp';

const imagesPath = path.join(__dirname, '../../public/images/');

export enum ImgNames {
  ENCENADA_PORT = 'encenadaport',
  FJORD = 'fjord',
  ICELAND_WATERFALL = 'icelandwaterfall',
  PALM_TUNNEL = 'palmtunnel',
  SANTA_MONICA = 'santamonica',
  TEST = 'test',
}

export enum ImgSizes {
  FULL_WIDTH = '1920',
  FULL_HEIGHT = '1273',
  EXTRA_LARGE = '600',
  LARGE = '400',
  MEDIUM = '200',
  SMALL = '150',
  EXTRA_SMALL = '100',
  THUMBNAIL = '75',
}

export enum ImgFormats {
  JPG = 'jpg',
  PNG = 'png',
}

export const imgExists = async (imgPath: string): Promise<boolean> => {
  try {
    await fsPromises.access(imgPath);
    return true;
  } catch {
    return false;
  }
};

export const isImgValidName = (name: string): boolean =>
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Object.values(ImgNames).includes(name as any);

export const isImgFullSize = (width: number, height: number): boolean =>
  width === parseInt(ImgSizes.FULL_WIDTH) &&
  height === parseInt(ImgSizes.FULL_HEIGHT);

export const getImgFormat = (format: string): string =>
  format === 'png' ? ImgFormats.PNG : ImgFormats.JPG;

export const getImgFileName = (
  imgName: string,
  width: number,
  height: number,
  format: string
): string => {
  const imgValidName = isImgValidName(imgName)
    ? imgName
    : ImgNames.ENCENADA_PORT;
  const imgFormat = getImgFormat(format);
  const fullsize = `${imgValidName}.${imgFormat}`;
  const thumbnail = `${imgValidName}-${width}-${height}.${imgFormat}`;

  return isImgFullSize(width, height) ? fullsize : thumbnail;
};

const getDefaultImgFile = (imgName: string): string =>
  getImgFileName(
    imgName,
    parseInt(ImgSizes.FULL_WIDTH),
    parseInt(ImgSizes.FULL_HEIGHT),
    ImgFormats.JPG
  );

export const createImgThumb = async (
  name: string,
  width: number,
  height: number,
  format: string
): Promise<{ result: string }> => {
  try {
    const input = `${imagesPath}${getDefaultImgFile(name)}`;
    const image = getImgFileName(name, width, height, format);
    const outputPath = `${imagesPath}${image}`;
    const doesImgExists = await imgExists(outputPath);

    if (!doesImgExists) {
      await sharp(input)
        .resize(width, height, { fit: 'cover' })
        .toFile(outputPath);
    }

    return { result: image };
  } catch (error) {
    return { result: `${error}` };
  }
};
