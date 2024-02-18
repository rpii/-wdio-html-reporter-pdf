import path from "path";
import printPdf from '@rpii/wdio-html-reporter-pdf' ;

(async () => {
    // you can override the names
    let args = process.argv.slice(2) ;
    let reportName = args[0] ? args[0] : "master-report.html";
    let pdfName = args[1] ? args[1] : 'master-report.pdf';
    let timeout:number = args[2] ? parseInt(args[2]) : 0 ;
    let chromePath = args[3] ? args[3] : undefined;

    // need absolute paths
    const pwd = path.resolve(".");

    // modify code below to point to where your report is generated
    let reportPath = '/test/reports/html-reports/' ;
    let htmlReportFile =  path.join(pwd, reportPath, reportName);
    let pdfFile = path.join(pwd, reportPath, pdfName);

    //for linux you will need these options
    let options = ['--no-sandbox','--disable-gpu','--disable-extensions'] ;
    await printPdf(htmlReportFile, pdfFile, options, timeout, chromePath) ;
})();
