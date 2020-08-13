
const path = require( "path") ;
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

async function printPdf(htmlFile, pdfFile, args) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: args
        });
        const page = await browser.newPage();
        let contentHtml = fs.readFileSync(htmlFile, 'utf8');
        await page.emulateMediaType('screen');
        await page.setDefaultNavigationTimeout(360000);
        await page.goto('file://' + htmlFile);
        await page.setContent(contentHtml);
        await page.evaluate(_ => {
            $('.suite-header').click();
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
        return pdf;
    } catch (error) {
        console.error(error);
        return null ;
    }
};

export default printPdf;