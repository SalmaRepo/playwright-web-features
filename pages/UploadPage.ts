import {Page,Locator} from '@playwright/test'

export class UploadPage{
    private readonly page:Page;
    private readonly chooseFile:Locator;
    private readonly uploadFile:Locator;
    public readonly uploadedFile:Locator;
    public readonly uploadedPageTitle:Locator;
    public readonly noUploadErrorMessage:Locator;
    public readonly backtoFileUploadLink:Locator;


    constructor(page:Page){
        this.page=page;
        this.chooseFile=this.page.locator('#file-upload');
        this.uploadFile=this.page.locator('#file-submit');
        this.uploadedPageTitle=this.page.locator('.example h3');
        this.uploadedFile=this.page.locator('#uploaded-files');
        this.noUploadErrorMessage=this.page.locator('#upload-error');
        this.backtoFileUploadLink=this.page.locator('a[href="/upload"]')

    }

    async chooseFileForUpload(filePath:string){
        await this.chooseFile.setInputFiles(filePath)
    }


    async clickUpload(){
        await this.uploadFile.click()
    }

    async fileUpload(filePath:string){
       await this.chooseFileForUpload(filePath);
       await this.clickUpload();
    }

    async noFileUpload(){
        await this.clickUpload()
    }

}