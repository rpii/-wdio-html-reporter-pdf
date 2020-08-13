const fs = require('fs-extra');
const path = require('path');
import {expect} from 'chai';
const log4js = require ('log4js') ;
let printPdf = require('../build/printPdf.js').default ;

describe('PdfPrint', () => {

    describe('on create', function () {
        it('should create the pdf file', async () => {
            let pdfFile = path.resolve(__dirname, '../reports/master-report.pdf');
            let htmlReportFile =  path.resolve(__dirname,'../reports/html-reports/master-report.html');
            // await printPdf(htmlReportFile, pdfFile, ['--no-sandbox']);
            await printPdf(htmlReportFile, pdfFile, []);
        });
    });
});
