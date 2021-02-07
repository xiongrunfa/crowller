import "reflect-metadata";
import { RequestHandler } from "express";
import { CrowllerController, LoginController } from "../controller";

export function use(middleWare: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    const originMiddleWares =
      Reflect.getMetadata("middleWares", target, key) || [];
    originMiddleWares.push(middleWare);
    Reflect.defineMetadata("middleWares", originMiddleWares, target, key);
  };
}
