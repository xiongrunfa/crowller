import fs from "fs";
import cheerio from "cheerio";
import { AnalyzerItf } from "./crowller";

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [proName: number]: Course[];
}

export default class Analyzer implements AnalyzerItf {
  private static instance: Analyzer;

  static getInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseInfo: Course[] = [];
    const courseItem = $(".bg000 .new-course div[data-type='精品免费'] .item");
    courseItem.map((index, element) => {
      const title = $(element).find(".title").text();
      const count = parseInt(
        $(element).find(".difficulty").text().split("·")[1].split("人")[0]
      );
      courseInfo.push({
        title,
        count,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfo,
    };
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
