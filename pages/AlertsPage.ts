import { Page, Locator } from "@playwright/test";

export class AlertsPage {
  private readonly page: Page;
  private readonly alerts: Locator;
  private readonly confirm: Locator;
  private readonly prompt: Locator;
  public readonly resultText:Locator

  constructor(page: Page) {
    this.page = page;
    this.alerts = this.page.getByRole("button", { name: "Click for JS Alert" });
    this.confirm = this.page.getByRole("button", {
      name: "Click for JS Confirm",
    });
    this.prompt = this.page.getByRole("button", {
      name: "Click for JS Prompt",
    });
    this.resultText=this.page.locator("#result");
  }

  async alertsClick() {
    await this.alerts.click();
  }

  async confirmClick() {
    await this.confirm.click();
  }

  async promptClick(){
    await this.prompt.click()
  }

  async grabAlertsMessage(): Promise<string> {
    const dialogPromise = this.page.waitForEvent("dialog");
    this.alertsClick();

    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();

    return message;
  }

  async handleConfirm(choice: "accept" | "dismiss"): Promise<string> {
    const dialogPromise = this.page.waitForEvent("dialog");
    this.confirmClick();
    const dialog = await dialogPromise;
    const message = dialog.message();

    if (choice === "accept") {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
    return message;
  }


  async handlePrompt(choice: "accept" | "dismiss",inputMessage?:string):Promise<string>{
    const dialogPromise=this.page.waitForEvent('dialog');
    this.promptClick();

    const dialog=await dialogPromise;
    const message=dialog.message();

      if (choice === "accept") {
      await dialog.accept(inputMessage);
    } else {
      await dialog.dismiss();
    }

    return message
  }
}

