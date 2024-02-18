import printPdf from '../lib/printPdf.js' ;
const fs = require('fs-extra');
const path = require('path');
const log4js = require ('log4js') ;

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
            let pdfFile = path.resolve(__dirname, '../test/reports/master-report.pdf');
            let htmlReportFile =  path.resolve(__dirname,'../test/reports/html-reports/master-report.html');
            // let options = ['--disable-gpu','--no-sandbox'] ;
            let options : string[] = ['--no-sandbox'] ;
            await printPdf(htmlReportFile, pdfFile, options, undefined, undefined);
        });
    });
});
