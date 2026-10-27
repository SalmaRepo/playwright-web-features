import { test, expect } from "@playwright/test";

import { UploadPage } from "../pages/UploadPage";
import path from 'path'

test.describe("File Upload Heroku App", () => {
  const baseUrl = "https://the-internet.herokuapp.com/upload";
  const filePath = "./test-data/simple.txt";
  let uploadPage:UploadPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    uploadPage = new UploadPage(page);
  });

  test("verify successful file upload", async () => {
    await uploadPage.fileUpload(filePath);
    await expect(uploadPage.uploadedPageTitle).toHaveText(
      "File Uploaded!",
    );
    await expect(uploadPage.uploadedFile).toHaveText(path.basename(filePath));
  });

  test("verify unsuccessful file upload", async () => {
    await uploadPage.noFileUpload();
    await expect(uploadPage.uploadedPageTitle).toHaveText(
      "Internal Server Error",
    );
    await expect(uploadPage.noUploadErrorMessage).toHaveText('No file was chosen. Please choose a file to upload.');
    await expect(uploadPage.backtoFileUploadLink).toBeVisible()
  });
});
