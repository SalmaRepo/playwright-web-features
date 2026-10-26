import { test, expect } from "@playwright/test";

import { AlertsPage } from "../pages/AlertsPage";

test.describe("Alerts Heroku app", () => {
  const baseUrl = "https://the-internet.herokuapp.com/javascript_alerts";
  const promptMessage = "welcome";
  let alertsPage: AlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await page.goto(baseUrl);
  });

  test("check alerts message after clicking ok", async () => {
    const message = await alertsPage.grabAlertsMessage();
    expect(message).toBe("I am a JS Alert");
    await expect(alertsPage.resultText).toHaveText(
      "You successfully clicked an alert",
    );
  });

  test("verify confirmation message in case of accept", async () => {
    const message = await alertsPage.handleConfirm("accept");
    expect(message).toBe("I am a JS Confirm");
    await expect(alertsPage.resultText).toHaveText("You clicked: Ok");
  });

  test("verify confirmation message in case of dismiss", async () => {
    const message = await alertsPage.handleConfirm("dismiss");
    expect(message).toBe("I am a JS Confirm");
    await expect(alertsPage.resultText).toHaveText("You clicked: Cancel");
  });

  test("verify prompt message in heroku app alerts in case of accept", async () => {
    const message = await alertsPage.handlePrompt("accept", promptMessage);
    expect(message).toBe("I am a JS prompt");
    await expect(alertsPage.resultText).toHaveText("You entered: welcome");
  });

  test("verify prompt message in heroku app alerts in case of dismiss", async () => {
    const message = await alertsPage.handlePrompt("dismiss");
    expect(message).toBe("I am a JS prompt");
    await expect(alertsPage.resultText).toHaveText("You entered: null");
  });
});
