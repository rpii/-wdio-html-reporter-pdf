const fs = require('fs-extra');
const path = require('path');
import {expect} from 'chai';
const log4js = require ('log4js') ;
let printPDF = require('../build/printPdf.js').default ;

describe('PdfPrint', () => {

    describe('on create', function () {
        it('should create the pdf file', async () => {
            let pdfFile = '../reports/master-report.pdf';
            await printPDF('../reports/html-reports/master-report.html', pdfFile);
        });
    });
});
