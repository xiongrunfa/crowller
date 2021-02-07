import router from "../router";
import { RequestHandler } from "express";
import { Methods } from "./request";
export function Controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const handler = target.prototype[key];
      const middleWares: RequestHandler[] = Reflect.getMetadata(
        "middleWares",
        target.prototype,
        key
      );
      if (path && method) {
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middleWares && middleWares.length) {
          router[method](fullPath, ...middleWares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
