import axios from "axios";
import * as https from "https";

export class Bing {
  private query: string;
  private adult: string;
  private filter: string;
  private blockedSites: string[];
  private verbose: boolean;
  private seen: Set<string>;
  private limit: number;
  private timeout: number;
  private pageCounter: number = 0;
  private headers: Record<string, string>;
  private logger: Console;

  constructor(
    query: string,
    limit: number,
    adult: string,
    timeout: number,
    filter: string = "",
    blockedSites: string[] = [],
    verbose: boolean = true
  ) {
    this.query = query;
    this.adult = adult;
    this.filter = filter;
    this.blockedSites = blockedSites;
    this.verbose = verbose;
    this.seen = new Set<string>();

    if (typeof limit !== "number") throw new Error("limit must be integer");
    this.limit = limit;
    if (typeof timeout !== "number") throw new Error("timeout must be integer");
    this.timeout = timeout;

    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
      "Accept-Encoding": "none",
      "Accept-Language": "en-US,en;q=0.8",
      Connection: "keep-alive",
    };

    this.logger = console;
  }

  private getFilter(shorthand: string): string {
    switch (shorthand) {
      case "line":
      case "linedrawing":
        return "+filterui:photo-linedrawing";
      case "photo":
        return "+filterui:photo-photo";
      case "clipart":
        return "+filterui:photo-clipart";
      case "gif":
      case "animatedgif":
        return "+filterui:photo-animatedgif";
      case "transparent":
        return "+filterui:photo-transparent";
      default:
        return shorthand;
    }
  }

  async run(): Promise<string[]> {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const imageUrls: string[] = [];

    while (imageUrls.length < this.limit) {
      if (this.verbose) {
        this.logger.info(`\n\n[!!] Indexing page: ${this.pageCounter + 1}\n`);
      }

      // const requestUrl = `https://www.bing.com/images/async?q=${encodeURIComponent(
      //   this.query
      // )}&first=${this.pageCounter}&count=${this.limit}&adlt=${this.adult}&qft=${
      //   this.filter ? this.getFilter(this.filter) : ""
      // }`;
      const requestUrl = `https://www.bing.com/images/search?q=${this.query}&qs=n&form=QBIR&sp=-1&lq=0&sc=0-0&cvid=12AFCBAE28AF483CB1BAAAED9EE50B9F&ghsh=0&ghacc=0&first=1`;
      this.logger.debug(requestUrl);

      const response = await axios.get(requestUrl, {
        headers: this.headers,
        httpsAgent: agent,
      });
      const html = response.data;
      this.logger.debug(html);

      if (!html) {
        this.logger.info("[%] No more images are available");
        break;
      }

      const links = (html.match(/murl&quot;:&quot;(.*?)&quot;/g) || []).map(
        (link: any) => link.replace(/murl&quot;:&quot;|&quot;/g, "")
      );

      if (this.verbose) {
        this.logger.info(
          `[%] Indexed ${links.length} Images on Page ${this.pageCounter + 1}.`
        );
        this.logger.info("\n===============================================\n");
      }

      for (const link of links) {
        if (imageUrls.length < this.limit && !this.seen.has(link)) {
          this.seen.add(link);
          imageUrls.push(link);
        }
      }

      this.pageCounter += 1;
    }
    this.logger.info(`\n\n[%] Done. Collected ${imageUrls.length} image URLs.`);
    return imageUrls;
  }
}

// Example usage

const test = async () => {
  const bing = new Bing("cats", 10, "off", 10000, "photo");
  const imageUrls = await bing.run();
  console.log(JSON.stringify(imageUrls, null, 2));
};

test();
