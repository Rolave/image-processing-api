"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
var viewsPath = path_1.default.join(__dirname, '../views');
var publicDirPath = path_1.default.join(__dirname, '../public');
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express_1.default.static(publicDirPath));
app.use('', index_1.default);
app.use(function (req, res) {
    res
        .status(404)
        .render('404', {
        title: 'Error 404',
        description: 'The content you where looking for does not exist.',
    });
});
exports.default = app;
