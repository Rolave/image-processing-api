import path from 'path';
import {
  ImgNames,
  ImgSizes,
  ImgFormats,
  imgExists,
  isImgValidName,
  isImgFullSize,
  getImgFormat,
  getImgFileName,
  createImgThumb,
} from '../../utilities';

const imagesPath = path.join(__dirname, '../../../public/images/');
const validImgNames = Object.values(ImgNames);
const validImgFormats = Object.values(ImgFormats);
const getValidImgName =
  validImgNames[Math.floor(Math.random() * validImgNames.length)];
const invalidImgName = 'valparaiso';
const customImgSize = 2000;
const invalidImgFormat = 'svg';

describe('Test if image exists', () => {
  it('should return false if image file does not exists', async () => {
    const imageExists = await imgExists(`${imagesPath + invalidImgName}.jpg`);

    expect(imageExists).toBeFalse();
  });

  it('should return true if image file exists', async () => {
    const imageExists = await imgExists(`${imagesPath + getValidImgName}.jpg`);

    expect(imageExists).toBeTrue();
  });
});

describe('Test if image has a valid name', () => {
  it('should return false if image name is not valid', () => {
    const imgName = isImgValidName(invalidImgName);

    expect(imgName).toBeFalse();
  });

  it('should return true if image name is valid', () => {
    const imgName = isImgValidName(getValidImgName);

    expect(imgName).toBeTrue();
  });
});

describe('Test if image is full size', () => {
  it('should return false if width is not fullsize', () => {
    const imgIsFullSize = isImgFullSize(
      parseInt(ImgSizes.EXTRA_LARGE),
      parseInt(ImgSizes.FULL_HEIGHT)
    );

    expect(imgIsFullSize).toBeFalse();
  });

  it('should return false if height is not fullsize', () => {
    const imgIsFullSize = isImgFullSize(
      parseInt(ImgSizes.FULL_WIDTH),
      parseInt(ImgSizes.EXTRA_LARGE)
    );

    expect(imgIsFullSize).toBeFalse();
  });

  it('should return true if width and height are fullsize', () => {
    const imgIsFullSize = isImgFullSize(
      parseInt(ImgSizes.FULL_WIDTH),
      parseInt(ImgSizes.FULL_HEIGHT)
    );

    expect(imgIsFullSize).toBeTrue();
  });
});

describe('Test image format extension', () => {
  it("should return 'jpg' when is an invalid format extension", () => {
    const imgFormat = getImgFormat(invalidImgFormat);

    expect(imgFormat).toBe('jpg');
  });

  it("should return 'png' when is a 'png' format extension", () => {
    const imgFormat = getImgFormat('png');

    expect(imgFormat).toBe('png');
  });

  it("should return 'jpg' when is a 'jpg' format extension", () => {
    const imgFormat = getImgFormat('png');

    expect(imgFormat).toBe('png');
  });
});

describe('Test image file name', () => {
  const validImgName = validImgNames[0];
  const fullSizeImgName = `${validImgName}.${ImgFormats.JPG}`;
  const imgName = `${validImgName}-${ImgSizes.LARGE}-${ImgSizes.LARGE}.${ImgFormats.JPG}`;
  const customSizeImgName = `${validImgName}-${customImgSize}-${customImgSize}.${ImgFormats.JPG}`;

  it('should return default image file name with an invalid name and extension', () => {
    const imgFileName = getImgFileName(
      invalidImgName,
      parseInt(ImgSizes.LARGE),
      parseInt(ImgSizes.LARGE),
      invalidImgFormat
    );

    expect(imgFileName).toBe(imgName);
  });

  it('should return custom size image file name with a valid name and extension', () => {
    const imgFileName = getImgFileName(
      validImgName,
      customImgSize,
      customImgSize,
      ImgFormats.JPG
    );

    expect(imgFileName).toBe(customSizeImgName);
  });

  it('should return full size image file name with a valid name and extension', () => {
    const imgFileName = getImgFileName(
      validImgName,
      parseInt(ImgSizes.FULL_WIDTH),
      parseInt(ImgSizes.FULL_HEIGHT),
      ImgFormats.JPG
    );

    expect(imgFileName).toBe(fullSizeImgName);
  });

  it('should return valid size image file name with a valid name and extension', () => {
    const imgFileName = getImgFileName(
      validImgName,
      parseInt(ImgSizes.LARGE),
      parseInt(ImgSizes.LARGE),
      ImgFormats.JPG
    );

    expect(imgFileName).toBe(imgName);
  });
});

describe('Test thumbnail image create', () => {
  it('should return default image path when image name is invalid', async () => {
    const imgPath = await createImgThumb(
      invalidImgName,
      parseInt(ImgSizes.FULL_WIDTH),
      parseInt(ImgSizes.FULL_HEIGHT),
      ImgFormats.JPG
    );
    const imgPathExpected = {
      result: `${validImgNames[0]}.${validImgFormats[0]}`,
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    expect(imgPath).toEqual(imgPathExpected as any);
  });

  it('should return full size image path when width and height values are full size', async () => {
    const imgPath = await createImgThumb(
      ImgNames.TEST,
      parseInt(ImgSizes.FULL_WIDTH),
      parseInt(ImgSizes.FULL_HEIGHT),
      ImgFormats.JPG
    );
    const imgPathExpected = {
      result: `${validImgNames[5]}.${validImgFormats[0]}`,
    };

    expect(imgPath).toEqual(imgPathExpected as any);
  });

  it('should return image path when width and height values are not full size', async () => {
    const imgPath = await createImgThumb(
      ImgNames.TEST,
      parseInt(ImgSizes.LARGE),
      parseInt(ImgSizes.LARGE),
      ImgFormats.JPG
    );
    const imgPathExpected = {
      result: `${validImgNames[5]}-${ImgSizes.LARGE}-${ImgSizes.LARGE}.${validImgFormats[0]}`,
    };

    expect(imgPath).toEqual(imgPathExpected as any);
  });
});
