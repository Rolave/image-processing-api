"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var utilities_1 = require("../../utilities");
var imagesPath = path_1.default.join(__dirname, '../../../public/images/');
var validImgNames = Object.values(utilities_1.ImgNames);
var validImgFormats = Object.values(utilities_1.ImgFormats);
var getValidImgName = validImgNames[Math.floor(Math.random() * validImgNames.length)];
var invalidImgName = 'valparaiso';
var customImgSize = 2000;
var invalidImgFormat = 'svg';
describe('Test if image exists', function () {
    it('should return false if image file does not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imageExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utilities_1.imgExists)(imagesPath + invalidImgName + ".jpg")];
                case 1:
                    imageExists = _a.sent();
                    expect(imageExists).toBeFalse();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return true if image file exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imageExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utilities_1.imgExists)(imagesPath + getValidImgName + ".jpg")];
                case 1:
                    imageExists = _a.sent();
                    expect(imageExists).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test if image has a valid name', function () {
    it('should return false if image name is not valid', function () {
        var imgName = (0, utilities_1.isImgValidName)(invalidImgName);
        expect(imgName).toBeFalse();
    });
    it('should return true if image name is valid', function () {
        var imgName = (0, utilities_1.isImgValidName)(getValidImgName);
        expect(imgName).toBeTrue();
    });
});
describe('Test if image is full size', function () {
    it('should return false if width is not fullsize', function () {
        var imgIsFullSize = (0, utilities_1.isImgFullSize)(parseInt(utilities_1.ImgSizes.EXTRA_LARGE), parseInt(utilities_1.ImgSizes.FULL_HEIGHT));
        expect(imgIsFullSize).toBeFalse();
    });
    it('should return false if height is not fullsize', function () {
        var imgIsFullSize = (0, utilities_1.isImgFullSize)(parseInt(utilities_1.ImgSizes.FULL_WIDTH), parseInt(utilities_1.ImgSizes.EXTRA_LARGE));
        expect(imgIsFullSize).toBeFalse();
    });
    it('should return true if width and height are fullsize', function () {
        var imgIsFullSize = (0, utilities_1.isImgFullSize)(parseInt(utilities_1.ImgSizes.FULL_WIDTH), parseInt(utilities_1.ImgSizes.FULL_HEIGHT));
        expect(imgIsFullSize).toBeTrue();
    });
});
describe('Test image format extension', function () {
    it("should return 'jpg' when is an invalid format extension", function () {
        var imgFormat = (0, utilities_1.getImgFormat)(invalidImgFormat);
        expect(imgFormat).toBe('jpg');
    });
    it("should return 'png' when is a 'png' format extension", function () {
        var imgFormat = (0, utilities_1.getImgFormat)('png');
        expect(imgFormat).toBe('png');
    });
    it("should return 'jpg' when is a 'jpg' format extension", function () {
        var imgFormat = (0, utilities_1.getImgFormat)('png');
        expect(imgFormat).toBe('png');
    });
});
describe('Test image file name', function () {
    var validImgName = validImgNames[0];
    var fullSizeImgName = validImgName + "." + utilities_1.ImgFormats.JPG;
    var imgName = validImgName + "-" + utilities_1.ImgSizes.LARGE + "-" + utilities_1.ImgSizes.LARGE + "." + utilities_1.ImgFormats.JPG;
    var customSizeImgName = validImgName + "-" + customImgSize + "-" + customImgSize + "." + utilities_1.ImgFormats.JPG;
    it('should return default image file name with an invalid name and extension', function () {
        var imgFileName = (0, utilities_1.getImgFileName)(invalidImgName, parseInt(utilities_1.ImgSizes.LARGE), parseInt(utilities_1.ImgSizes.LARGE), invalidImgFormat);
        expect(imgFileName).toBe(imgName);
    });
    it('should return custom size image file name with a valid name and extension', function () {
        var imgFileName = (0, utilities_1.getImgFileName)(validImgName, customImgSize, customImgSize, utilities_1.ImgFormats.JPG);
        expect(imgFileName).toBe(customSizeImgName);
    });
    it('should return full size image file name with a valid name and extension', function () {
        var imgFileName = (0, utilities_1.getImgFileName)(validImgName, parseInt(utilities_1.ImgSizes.FULL_WIDTH), parseInt(utilities_1.ImgSizes.FULL_HEIGHT), utilities_1.ImgFormats.JPG);
        expect(imgFileName).toBe(fullSizeImgName);
    });
    it('should return valid size image file name with a valid name and extension', function () {
        var imgFileName = (0, utilities_1.getImgFileName)(validImgName, parseInt(utilities_1.ImgSizes.LARGE), parseInt(utilities_1.ImgSizes.LARGE), utilities_1.ImgFormats.JPG);
        expect(imgFileName).toBe(imgName);
    });
});
describe('Test thumbnail image create', function () {
    it('should return default image path when image name is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imgPath, imgPathExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utilities_1.createImgThumb)(invalidImgName, parseInt(utilities_1.ImgSizes.FULL_WIDTH), parseInt(utilities_1.ImgSizes.FULL_HEIGHT), utilities_1.ImgFormats.JPG)];
                case 1:
                    imgPath = _a.sent();
                    imgPathExpected = {
                        result: validImgNames[0] + "." + validImgFormats[0],
                    };
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    expect(imgPath).toEqual(imgPathExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return full size image path when width and height values are full size', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imgPath, imgPathExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utilities_1.createImgThumb)(utilities_1.ImgNames.TEST, parseInt(utilities_1.ImgSizes.FULL_WIDTH), parseInt(utilities_1.ImgSizes.FULL_HEIGHT), utilities_1.ImgFormats.JPG)];
                case 1:
                    imgPath = _a.sent();
                    imgPathExpected = {
                        result: validImgNames[5] + "." + validImgFormats[0],
                    };
                    expect(imgPath).toEqual(imgPathExpected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return image path when width and height values are not full size', function () { return __awaiter(void 0, void 0, void 0, function () {
        var imgPath, imgPathExpected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utilities_1.createImgThumb)(utilities_1.ImgNames.TEST, parseInt(utilities_1.ImgSizes.LARGE), parseInt(utilities_1.ImgSizes.LARGE), utilities_1.ImgFormats.JPG)];
                case 1:
                    imgPath = _a.sent();
                    imgPathExpected = {
                        result: validImgNames[5] + "-" + utilities_1.ImgSizes.LARGE + "-" + utilities_1.ImgSizes.LARGE + "." + validImgFormats[0],
                    };
                    expect(imgPath).toEqual(imgPathExpected);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=imageUtitlities.spec.js.map