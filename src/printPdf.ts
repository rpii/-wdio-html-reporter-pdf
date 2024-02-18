
import path from "path" ;
import puppeteer from 'puppeteer';
import fs from 'fs-extra';

async function printPdf(htmlFile:string, pdfFile:string, optArgs:string[], timeout?:number, chromePath?:string ) {
    try {
        console.log("printPdf starting for " + htmlFile + " to " + pdfFile);
        let options = {
            headless: true,
            dumpio: true,
            timeout: (timeout) ? timeout : 0,
            args: optArgs
        };
        if (chromePath) {
            //@ts-ignore
            options.executablePath = chromePath;
        }

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        let contentHtml = fs.readFileSync(htmlFile, 'utf8');
        await page.emulateMediaType('screen');
        await page.setDefaultNavigationTimeout(0);
        await page.goto('file://' + htmlFile);
        await page.setContent(contentHtml);

        await page.evaluate(() => {
            document.querySelectorAll('.suite-header').forEach(item => {
                //@ts-ignore
                item.click();
            });
            return Promise.resolve();
        });

        await page.evaluate(() => {
            document.querySelectorAll('.test-header').forEach(item => {
                //@ts-ignore
                item.click();
            });
            return Promise.resolve();
        });
        const pdf = await page.pdf({
            path: pdfFile, // Saves pdf to disk.
            preferCSSPageSize: true,
            printBackground: true,
            timeout:0,
            margin: {
                top: "20px",
                left: "20px",
                right: "20px",
                bottom: "20px"
            }
        });

        await browser.close();
        console.log("printPdf completed.");
        return pdf;
    } catch (error) {
        console.error(error);
        return null ;
    }
};

export default printPdf;