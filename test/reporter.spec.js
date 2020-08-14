const fs = require('fs-extra');
const path = require('path');
import {expect} from 'chai';
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

let printPdf = require('../build/printPdf.js').default ;

describe('PdfPrint', () => {

    describe('on create', function () {
        it('should create the pdf file', async () => {
            let pdfFile = path.resolve(__dirname, '../reports/master-report.pdf');
            let htmlReportFile =  path.resolve(__dirname,'../reports/html-reports/master-report.html');
            // let options = ['--disable-gpu','--no-sandbox'] ;
            let options = ['--no-sandbox'] ;
            await printPdf(htmlReportFile, pdfFile, options);
        });
    });
});
