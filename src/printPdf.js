
const path = require( "path") ;
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

async function printPdf(htmlFile, pdfFile, optArgs, chromePath ) {
    try {
        console.log("printPdf starting for " + htmlFile + " to " + pdfFile);
        let options = {
            headless: true,
            timeout: 360000,
            dumpio: true,
            args: optArgs
        };
        if (chromePath) {
            options.executablePath = chromePath;
        }

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        let contentHtml = fs.readFileSync(htmlFile, 'utf8');
        await page.emulateMediaType('screen');
        await page.setDefaultNavigationTimeout(360000);
        await page.goto('file://' + htmlFile);
        await page.setContent(contentHtml);
        await page.evaluate(_ => {
            document.querySelectorAll('.suite-header').forEach(item => {
                item.click();
            });
        });
        await page.evaluate(_ => {
            document.querySelectorAll('.test-header').forEach(item => {
                item.click();
            });
        });
        const pdf = await page.pdf({
            path: pdfFile, // Saves pdf to disk.
            preferCSSPageSize: true,
            printBackground: true,
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