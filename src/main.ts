import { chromium } from "playwright";
import { createDirIfNotExist, downloadImage } from "./util";

const scrapePage = async (
  celebrityName: string,
  baseUrl: string,
  pageIdx: number
) => {
  const browser = await chromium.launch({ headless: false });
  const url = `${baseUrl}&page=${pageIdx}`;

  const page = await browser.newPage();
  const mouse = page.mouse;

  await page.goto(url, { waitUntil: "load" });
  console.log(`[Opened Page]: ${url}`);

  const locator = page.locator("[data-testid=galleryMosaicAsset]");

  // ------- Scroll to bottom -------
  for (let i = 0; i < 5; i++) {
    await mouse.wheel(0, 1000);
    await page.waitForTimeout(50.1);
  }

  // ------- Get Img Src -------
  const result = await locator.evaluateAll(async (div, str) => {
    return await Promise.all(
      div.map((d) => d.querySelector("img")?.getAttribute("src"))
    );
  });

  const outDir = `./out/${celebrityName}/${pageIdx}`;
  createDirIfNotExist(outDir);

  // ------- Download Img -------
  for (let i = 0; i < result.length; i++) {
    const url = result[i];
    if (!url) continue;
    // console.log(url);
    await downloadImage(url, `${outDir}/${i}.jpg`);
  }

  browser.close();
};

// ===================== Constants =====================
const PAGE_TO_SCRAPE = 3;
const BASE_URLS: Record<string, string> = {
  "elon-musk":
    "https://www.gettyimages.hk/%E5%9C%96%E7%89%87/elon-musk?assettype=image&family=editorial&phrase=elon%20musk&sort=best",
  "donald-trump":
    "https://www.gettyimages.hk/%E5%9C%96%E7%89%87/donald-trump?assettype=image&family=editorial&phrase=donald%20trump&sort=best",
  obama:
    "https://www.gettyimages.hk/%e5%9c%96%e7%89%87/obama?assettype=image&family=editorial&phrase=obama&sort=best",
  "bill-gates":
    "https://www.gettyimages.hk/%e5%9c%96%e7%89%87/bill-gates?assettype=image&family=editorial&phrase=bill%20gates&sort=best",
};
// ==================================================
const main = async () => {
  for (const [key, value] of Object.entries(BASE_URLS)) {
    for (const i of Array(PAGE_TO_SCRAPE).keys()) {
      scrapePage(key, value, i + 1);
    }
  }
};
main();
