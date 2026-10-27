import { test, expect } from "@playwright/test";
import fs from "fs";

import { DownloadPage } from "../pages/DownloadPage";

test.describe("File Download", () => {
  const baseUrl = "https://the-internet.herokuapp.com/download";
  const expectedFileName = "Images.txt";

  test("downloading a file saves it with the correct name and content", async ({
    page,
  }, testInfo) => {
    await page.goto(baseUrl);
    const downloadPage = new DownloadPage(page);

    const download = await downloadPage.downloadFile();

    expect(download.suggestedFilename()).toBe(expectedFileName);

    expect(await download.failure()).toBeNull();

    const savepath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(savepath);

    expect(fs.existsSync(savepath)).toBe(true);
    expect(fs.statSync(savepath).size).toBeGreaterThan(0);
  });
});
