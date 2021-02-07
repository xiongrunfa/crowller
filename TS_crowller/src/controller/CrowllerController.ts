import fs from "fs";
import path from "path";
import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { Controller, use, get } from "../decorator";
import { getResponseData } from "../utils/util";
import Analyzer from "../utils/analyzer";
import Crowller from "../utils/crowller";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (
  req: BodyRequest,
  res: Response,
  next: NextFunction
): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
};

@Controller("/api")
export class CrowllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const url = `https://www.imooc.com/?utm_term=%E6%85%95%E8%AF%BE%E7%BD%91&utm_campaign=SEM&utm_source=bdpinpai`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData<responseResult.getData>(true));
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(
        getResponseData<responseResult.DataStructure>(JSON.parse(result))
      );
    } catch {
      res.json(getResponseData<responseResult.showData>(false, "数据不存在"));
    }
  }
}
