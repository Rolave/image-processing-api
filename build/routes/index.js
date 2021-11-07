"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utilities_1 = require("../utilities");
var routes = express_1.default.Router();
routes.use(function (req, _res, next) {
    /* eslint-disable no-undef, no-console */
    console.log('Method:', req.method);
    console.log('Query:', req.query);
    /* eslint-enable no-undef, no-console */
    next();
});
routes.get('/', function (_req, res) {
    res.render('index', {
        images: Object.entries(utilities_1.ImgNames)
            .filter(function (item) { return item[0] !== 'TEST'; })
            .map(function (item) { return ({
            key: item[0].toLowerCase().split('_').join(' '),
            value: item[1],
        }); }),
        widths: Object.entries(utilities_1.ImgSizes)
            .filter(function (item) { return item[0] !== 'FULL_HEIGHT'; })
            .map(function (item) { return ({
            key: item[0] === 'FULL_WIDTH'
                ? item[0].toLowerCase().split('_').join(' ')
                : item[1],
            value: item[1],
        }); }),
        heights: Object.entries(utilities_1.ImgSizes)
            .filter(function (item) { return item[0] !== 'FULL_WIDTH'; })
            .map(function (item) { return ({
            key: item[0] === 'FULL_HEIGHT'
                ? item[0].toLowerCase().split('_').join(' ')
                : item[1],
            value: item[1],
        }); }),
        formats: Object.values(utilities_1.ImgFormats),
    });
});
routes.get('/images/', (0, utilities_1.cacheMiddleware)(300));
exports.default = routes;
//# sourceMappingURL=index.js.map