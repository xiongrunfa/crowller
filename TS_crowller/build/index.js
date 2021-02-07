"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrowllerController");
var router_1 = __importDefault(require("./router"));
// 问题一： express 库的类型定义文件 .d.ts文件类型描述不准确
// 问题二： 当我使用中间件的时候，对req 或 res做了修改之后，实际上类型并不能改变
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: "session",
    keys: ["student xiong"],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log("serve is running");
});
