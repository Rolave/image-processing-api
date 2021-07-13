"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var images = express_1.default.Router();
var imagesPath = path_1.default.join(__dirname, '../../../public/images');
images.get('/images/', function (req, res) {
    console.log(req.params);
    res.send({
        title: 'caca',
        description: 'seca',
    });
});
images.get('/', function (req, res) {
    res.render('404');
});
exports.default = images;
