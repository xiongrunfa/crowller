"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.getInstance = function () {
        if (!Analyzer.instance) {
            Analyzer.instance = new Analyzer();
        }
        return Analyzer.instance;
    };
    Analyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseInfo = [];
        var courseItem = $(".bgfff .new-course .list .item");
        courseItem.map(function (index, element) {
            var title = $(element).find(".title").text();
            var count = parseInt($(element).find(".difficulty").text().split("·")[1].split("人")[0]);
            courseInfo.push({
                title: title,
                count: count,
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfo,
        };
    };
    Analyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return Analyzer;
}());
exports.default = Analyzer;
