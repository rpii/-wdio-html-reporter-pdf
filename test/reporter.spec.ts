import printPdf from '../lib/printPdf.js' ;
import path from 'path';
import log4js from 'log4js' ;
import url from "node:url";

log4js.configure({
    appenders: {
        fileLog: {
            type: 'file',
            filename: "logs/console.log"
        },
        'out': {
            type: 'stdout',
            layout: {type: 'basic'}
        }
    },
    categories: {
        file: {appenders: ['fileLog'], level: 'info'},
        default: {appenders: ['out', 'fileLog'], level: 'info'}
    }
});

describe('PdfPrint', () => {

    describe('on create',  () => {
        it('should create the pdf file', async () => {
            const rootDir = path.dirname(url.fileURLToPath(new URL('.', import.meta.url)));
            let pdfFile = path.join(rootDir, '/test/reports/master-report.pdf');
            let htmlReportFile = path.join(rootDir, '/test/reports/html-reports/master-report.html');

            // let options = ['--disable-gpu','--no-sandbox'] ;
            let options : string[] = ['--no-sandbox'] ;
            await printPdf(htmlReportFile, pdfFile, options, undefined, undefined);
        });
    });
});
