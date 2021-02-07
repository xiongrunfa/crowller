//  ts -> .d.ts 翻译文件 ->js
import fs from "fs";
import path from "path";
import superagent from "superagent";

export interface AnalyzerItf {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, "../../data/course.json");

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: AnalyzerItf) {
    this.initSpiderProcess();
  }
}

export default Crowller;
