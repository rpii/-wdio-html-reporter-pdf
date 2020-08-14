let printPdf = require('@rpii/wdio-html-reporter-pdf').default ;
(async () => {
    // need full paths
    let htmlReportFile =  path.resolve(__dirname,'reports/html-reports/master-report.html');
    let pdfFile = path.resolve(__dirname, 'reports/master-report.pdf');
    //for linux you will need these options
    let options = ['--no-sandbox','--disable-gpu','--disable-extensions'] ;
    await printPdf(htmlReportFile, pdfFile, options) ;
})();
