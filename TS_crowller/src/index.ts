import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controller/LoginController";
import "./controller/CrowllerController";
import router from "./router";

// 问题一： express 库的类型定义文件 .d.ts文件类型描述不准确
// 问题二： 当我使用中间件的时候，对req 或 res做了修改之后，实际上类型并不能改变

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["student xiong"],
    maxAge: 24 * 60 * 60 * 1000, //24 hours
  })
);
app.use(router);

app.listen(7001, () => {
  console.log("serve is running");
});
