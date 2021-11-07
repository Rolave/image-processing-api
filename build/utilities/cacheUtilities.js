"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
var node_cache_1 = __importDefault(require("node-cache"));
var _1 = require(".");
var cache = new node_cache_1.default();
var getkeyName = function (image, width, height, format) { return (0, _1.getImgFileName)(image, parseInt(width), parseInt(height), format); };
var cacheMiddleware = function (duration) { return function (req, res, next) {
    if (res === void 0) { res = any > ; }
    var _a = req.query, image = _a.image, width = _a.width, height = _a.height, format = _a.format;
    var key = getkeyName(image, width, height, format);
    var cachedResponse = cache.get(key);
    if (cachedResponse) {
        res.send({ image: cachedResponse });
    }
    else {
        var sendResponse = res.send.bind(res);
        console.log(sendResponse);
        next();
        // res.send = (body: any) => {
        // cache.set(key, body, duration);
        // }
    }
}; };
exports.cacheMiddleware = cacheMiddleware;
