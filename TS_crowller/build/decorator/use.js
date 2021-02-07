"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
function use(middleWare) {
    return function (target, key) {
        var originMiddleWares = Reflect.getMetadata("middleWares", target, key) || [];
        originMiddleWares.push(middleWare);
        Reflect.defineMetadata("middleWares", originMiddleWares, target, key);
    };
}
exports.use = use;
