"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cache_1 = __importDefault(require("node-cache"));
var imageUtitlities_1 = __importDefault(require("../../utilities/imageUtitlities"));
var cache = new node_cache_1.default();
var cacheMiddleware = function (duration) { return function (req, res, next) {
    var _a = req.query, image = _a.image, width = _a.width, height = _a.height, format = _a.format;
    var key = imageUtitlities_1.default.getImgFileName(image, parseInt(width), parseInt(height), format);
    var cachedResponse = cache.get(key);
    if (cachedResponse) {
        res.send({ image: cachedResponse });
    }
    else {
        cache.set(key, key, duration);
        next();
    }
}; };
exports.default = cacheMiddleware;
