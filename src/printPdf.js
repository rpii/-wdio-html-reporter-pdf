
const path = require( "path") ;
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

async function printPDF(htmlFile, pdfFile) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        let htmlFilename = path.resolve(__dirname, htmlFile) ;
        let contentHtml = fs.readFileSync(htmlFilename, 'utf8');
        await page.emulateMediaType('screen');
        await page.setDefaultNavigationTimeout(360000);
        await page.goto('file://' + htmlFilename);
        await page.setContent(contentHtml);
        await page.evaluate(_ => {
            $('.suite-header').click();
        });
        let pdfFilename = path.resolve(__dirname, pdfFile) ;
        const pdf = await page.pdf({
            path: pdfFilename, // Saves pdf to disk.
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

export default printPDF;