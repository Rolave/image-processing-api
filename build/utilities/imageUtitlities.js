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
exports.createImgThumb = exports.getImgFileName = exports.getImgFormat = exports.isImgFullSize = exports.isImgValidName = exports.imgExists = exports.ImgFormats = exports.ImgSizes = exports.ImgNames = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var imagesPath = path_1.default.join(__dirname, '../../public/images/');
var ImgNames;
(function (ImgNames) {
    ImgNames["ENCENADA_PORT"] = "encenadaport";
    ImgNames["FJORD"] = "fjord";
    ImgNames["ICELAND_WATERFALL"] = "icelandwaterfall";
    ImgNames["PALM_TUNNEL"] = "palmtunnel";
    ImgNames["SANTA_MONICA"] = "santamonica";
    ImgNames["TEST"] = "test";
})(ImgNames = exports.ImgNames || (exports.ImgNames = {}));
var ImgSizes;
(function (ImgSizes) {
    ImgSizes["FULL_WIDTH"] = "1920";
    ImgSizes["FULL_HEIGHT"] = "1273";
    ImgSizes["EXTRA_LARGE"] = "600";
    ImgSizes["LARGE"] = "400";
    ImgSizes["MEDIUM"] = "200";
    ImgSizes["SMALL"] = "150";
    ImgSizes["EXTRA_SMALL"] = "100";
    ImgSizes["THUMBNAIL"] = "75";
})(ImgSizes = exports.ImgSizes || (exports.ImgSizes = {}));
var ImgFormats;
(function (ImgFormats) {
    ImgFormats["JPG"] = "jpg";
    ImgFormats["PNG"] = "png";
})(ImgFormats = exports.ImgFormats || (exports.ImgFormats = {}));
var imgExists = function (imgPath) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_1.promises.access(imgPath)];
            case 1:
                _b.sent();
                return [2 /*return*/, true];
            case 2:
                _a = _b.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.imgExists = imgExists;
var isImgValidName = function (name) {
    return Object.values(ImgNames).includes(name);
};
exports.isImgValidName = isImgValidName;
var isImgFullSize = function (width, height) {
    return width === parseInt(ImgSizes.FULL_WIDTH) &&
        height === parseInt(ImgSizes.FULL_HEIGHT);
};
exports.isImgFullSize = isImgFullSize;
var getImgFormat = function (format) {
    return format === 'png' ? ImgFormats.PNG : ImgFormats.JPG;
};
exports.getImgFormat = getImgFormat;
var getImgFileName = function (imgName, width, height, format) {
    var imgValidName = (0, exports.isImgValidName)(imgName)
        ? imgName
        : ImgNames.ENCENADA_PORT;
    var imgFormat = (0, exports.getImgFormat)(format);
    var fullsize = imgValidName + "." + imgFormat;
    var thumbnail = imgValidName + "-" + width + "-" + height + "." + imgFormat;
    return (0, exports.isImgFullSize)(width, height) ? fullsize : thumbnail;
};
exports.getImgFileName = getImgFileName;
var getDefaultImgFile = function (imgName) {
    return (0, exports.getImgFileName)(imgName, parseInt(ImgSizes.FULL_WIDTH), parseInt(ImgSizes.FULL_HEIGHT), ImgFormats.JPG);
};
var createImgThumb = function (name, width, height, format) { return __awaiter(void 0, void 0, void 0, function () {
    var input, image, outputPath, doesImgExists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                input = "" + imagesPath + getDefaultImgFile(name);
                image = (0, exports.getImgFileName)(name, width, height, format);
                outputPath = "" + imagesPath + image;
                return [4 /*yield*/, (0, exports.imgExists)(outputPath)];
            case 1:
                doesImgExists = _a.sent();
                if (!!doesImgExists) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, sharp_1.default)(input)
                        .resize(width, height, { fit: 'cover' })
                        .toFile(outputPath)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, { result: image }];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, { result: "" + error_1 }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createImgThumb = createImgThumb;
