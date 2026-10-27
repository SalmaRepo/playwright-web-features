import { Page, Locator,Download } from "@playwright/test";

export class DownloadPage {
  private readonly page: Page;
  public readonly fileToDownload: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileToDownload = this.page.locator('a[href="download/Images.txt"]');
  }

  async clickDownload() {
    await this.fileToDownload.click();
  }

  async downloadFile():Promise<Download>{
    const downlaodPromise = this.page.waitForEvent("download");
    await this.clickDownload();
    const download = await downlaodPromise;
   return download;
  }
}
