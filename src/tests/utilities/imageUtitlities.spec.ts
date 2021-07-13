import fs from 'fs';
import path from 'path';
import imageUtitlities from '../../utilities/imageUtitlities';

const imagesPath = path.join(__dirname, '../../../public/images/');
const validImgNames = Object.values(imageUtitlities.ImgNames);
const validImgSizes = Object.values(imageUtitlities.ImgSizes);
const validImgFormats = Object.values(imageUtitlities.ImgFormats);
const getValidImgName =
  validImgNames[Math.floor(Math.random() * validImgNames.length)];
const getValidImgSize =
  validImgSizes[Math.floor(Math.random() * validImgSizes.length)];
const getValidImgFormat =
  validImgFormats[Math.floor(Math.random() * validImgFormats.length)];
const invalidImgName = 'valparaiso';
const customImgSize = 2000;
const invalidImgFormat = 'svg';

describe('Test if image exists', () => {
  it('should return false if image file does not exists', async () => {
    const imgExists = await imageUtitlities.imgExists(
      `${imagesPath + invalidImgName}.jpg`
    );
    expect(imgExists).toBeFalse();
  });

  it('should return true if image file exists', async () => {
    const imgExists = await imageUtitlities.imgExists(
      `${imagesPath + getValidImgName}.jpg`
    );
    expect(imgExists).toBeTrue();
  });
});

describe('Test if image has a valid name', () => {
  it('should return false if image name is not valid', () => {
    const imgName = imageUtitlities.isImgValidName(invalidImgName);

    expect(imgName).toBeFalse();
  });

  it('should return true if image name is valid', () => {
    const imgName = imageUtitlities.isImgValidName(getValidImgName);

    expect(imgName).toBeTrue();
  });
});

describe('Test if image is full size', () => {
  it('should return false if width is not fullsize', () => {
    const imgIsFullSize = imageUtitlities.isImgFullSize(
      parseInt(imageUtitlities.ImgSizes.EXTRA_LARGE),
      parseInt(imageUtitlities.ImgSizes.FULL_HEIGHT)
    );

    expect(imgIsFullSize).toBeFalse();
  });

  it('should return false if height is not fullsize', () => {
    const imgIsFullSize = imageUtitlities.isImgFullSize(
      parseInt(imageUtitlities.ImgSizes.FULL_WIDTH),
      parseInt(imageUtitlities.ImgSizes.EXTRA_LARGE)
    );

    expect(imgIsFullSize).toBeFalse();
  });

  it('should return true if width and height are fullsize', () => {
    const imgIsFullSize = imageUtitlities.isImgFullSize(
      parseInt(imageUtitlities.ImgSizes.FULL_WIDTH),
      parseInt(imageUtitlities.ImgSizes.FULL_HEIGHT)
    );

    expect(imgIsFullSize).toBeTrue();
  });
});

describe('Test image format extension', () => {
  it("should return 'jpg' when is an invalid format extension", () => {
    const imgFormat = imageUtitlities.getImgFormat(invalidImgFormat);

    expect(imgFormat).toBe('jpg');
  });

  it("should return 'png' when is a 'png' format extension", () => {
    const imgFormat = imageUtitlities.getImgFormat('png');

    expect(imgFormat).toBe('png');
  });

  it("should return 'jpg' when is a 'jpg' format extension", () => {
    const imgFormat = imageUtitlities.getImgFormat('png');

    expect(imgFormat).toBe('png');
  });
});

describe('Test image file name', () => {
  const validImgName = validImgNames[0];
  const fullSizeImgName = `${validImgName}.${imageUtitlities.ImgFormats.JPG}`;
  const imgName = `${validImgName}-${imageUtitlities.ImgSizes.LARGE}-${imageUtitlities.ImgSizes.LARGE}.${imageUtitlities.ImgFormats.JPG}`;
  const customSizeImgName = `${validImgName}-${customImgSize}-${customImgSize}.${imageUtitlities.ImgFormats.JPG}`;

  it('should return default image file name with an invalid name and extension', () => {
    const imgFileName = imageUtitlities.getImgFileName(
      invalidImgName,
      parseInt(imageUtitlities.ImgSizes.LARGE),
      parseInt(imageUtitlities.ImgSizes.LARGE),
      invalidImgFormat
    );

    expect(imgFileName).toBe(imgName);
  });

  it('should return custom size image file name with a valid name and extension', () => {
    const imgFileName = imageUtitlities.getImgFileName(
      validImgName,
      customImgSize,
      customImgSize,
      imageUtitlities.ImgFormats.JPG
    );

    expect(imgFileName).toBe(customSizeImgName);
  });

  it('should return full size image file name with a valid name and extension', () => {
    const imgFileName = imageUtitlities.getImgFileName(
      validImgName,
      parseInt(imageUtitlities.ImgSizes.FULL_WIDTH),
      parseInt(imageUtitlities.ImgSizes.FULL_HEIGHT),
      imageUtitlities.ImgFormats.JPG
    );

    expect(imgFileName).toBe(fullSizeImgName);
  });

  it('should return valid size image file name with a valid name and extension', () => {
    const imgFileName = imageUtitlities.getImgFileName(
      validImgName,
      parseInt(imageUtitlities.ImgSizes.LARGE),
      parseInt(imageUtitlities.ImgSizes.LARGE),
      imageUtitlities.ImgFormats.JPG
    );

    expect(imgFileName).toBe(imgName);
  });
});

describe('Test thumbnail image create', () => {
  it('should return default image path when image name is invalid', async () => {
    const imgPath = await imageUtitlities.createImgThumb(
      invalidImgName,
      parseInt(imageUtitlities.ImgSizes.FULL_WIDTH),
      parseInt(imageUtitlities.ImgSizes.FULL_HEIGHT),
      imageUtitlities.ImgFormats.JPG
    );
    const imgPathExpected = `${validImgNames[0]}.${validImgFormats[0]}`;

    expect(imgPath).toBe(imgPathExpected);
  });

  it('should return full size image path when width and height values are full size', async () => {
    const imgPath = await imageUtitlities.createImgThumb(
      imageUtitlities.ImgNames.TEST,
      parseInt(imageUtitlities.ImgSizes.FULL_WIDTH),
      parseInt(imageUtitlities.ImgSizes.FULL_HEIGHT),
      imageUtitlities.ImgFormats.JPG
    );
    const imgPathExpected = `${validImgNames[5]}.${validImgFormats[0]}`;

    expect(imgPath).toBe(imgPathExpected);
  });

  it('should return image path when width and height values are not full size', async () => {
    const imgPath = await imageUtitlities.createImgThumb(
      imageUtitlities.ImgNames.TEST,
      parseInt(imageUtitlities.ImgSizes.LARGE),
      parseInt(imageUtitlities.ImgSizes.LARGE),
      imageUtitlities.ImgFormats.JPG
    );
    const imgPathExpected = `${validImgNames[5]}-${imageUtitlities.ImgSizes.LARGE}-${imageUtitlities.ImgSizes.LARGE}.${validImgFormats[0]}`;

    expect(imgPath).toBe(imgPathExpected);
  });
});
