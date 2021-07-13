"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var chalk_1 = __importDefault(require("chalk"));
var port = process.env.port || 3000;
app_1.default.listen(port, function () {
    console.log("App listening at " + chalk_1.default.green('http://localhost:' + port));
});
