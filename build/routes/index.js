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
var express_1 = __importDefault(require("express"));
var cacheUtilities_1 = __importDefault(require("../utilities/cacheUtilities"));
var imageUtitlities_1 = __importDefault(require("../utilities/imageUtitlities"));
var routes = express_1.default.Router();
routes.use(function (req, res, next) {
    console.log('Method:', req.method);
    console.log('Query:', req.query);
    next();
});
routes.get('/', function (req, res) {
    console.log(Object.values(imageUtitlities_1.default.ImgSizes));
    res.render('index', {
        images: Object.entries(imageUtitlities_1.default.ImgNames)
            .filter(function (item) { return item[0] != 'TEST'; })
            .map(function (item) { return ({
            key: item[0].toLowerCase().split('_').join(' '),
            value: item[1],
        }); }),
        widths: Object.entries(imageUtitlities_1.default.ImgSizes)
            .filter(function (item) { return item[0] != 'FULL_HEIGHT'; })
            .map(function (item) { return ({
            key: item[0] === 'FULL_WIDTH'
                ? item[0].toLowerCase().split('_').join(' ')
                : item[1],
            value: item[1],
        }); }),
        heights: Object.entries(imageUtitlities_1.default.ImgSizes)
            .filter(function (item) { return item[0] != 'FULL_WIDTH'; })
            .map(function (item) { return ({
            key: item[0] === 'FULL_HEIGHT'
                ? item[0].toLowerCase().split('_').join(' ')
                : item[1],
            value: item[1],
        }); }),
        formats: Object.values(imageUtitlities_1.default.ImgFormats),
    });
});
routes.get('/images/', cacheUtilities_1.default(300), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, image, format, width, height, imgThumb;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, image = _a.image, format = _a.format;
                width = parseInt(req.query.width);
                height = parseInt(req.query.height);
                return [4 /*yield*/, imageUtitlities_1.default.createImgThumb(image, width, height, format)];
            case 1:
                imgThumb = _b.sent();
                res.send({
                    image: imgThumb,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
