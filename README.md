# wdio-html-reporter-pdf
Generate a pdf from an html-report.  
Requires version 6.1.0 of wdio-hmtl-reporter

## Installation

The easiest way is to keep the `@rpii/wdio-html-reporter-pdf` as a devDependency in your package.json:

```javascript
{
  "devDependencies": {
    "@rpii/wdio-html-reporter-pdf": "~6.1.0"
  }
}
```

## Configuration
The following code shows the default wdio test runner configuration. Just add an HtmlReporter object as another reporter to the reporters array.  Syntax shown requires babel:

```javascript
// wdio.conf.js
import { ReportAggregator, HtmlReporter} from '@rpii/wdio-html-reporter' ;
var printPdf = require('@rpii/wdio-html-reporter-pdf') ;
module.exports = {

  
  reporters: ['spec',
        [HtmlReporter, {
            debug: true,
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            
            //to show the report in a browser when done
            showInBrowser: true,

            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false,

            //to initialize the logger
            LOG: log4j.getLogger("default")
        }
        ]
    ]
    
 
};
```
## Configuration Options:
  
### To generate a master report for all suites

webdriver.io will call the reporter for each test suite.  It does not aggregate the reports.  To do this, add the following event handlers to your wdio.config.js

```javascript
    onPrepare: function (config, capabilities) {

        let reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Master Report',

            browserName : browser.capabilities.browserName,
            // to use the template override option, can point to your own file in the test project:
            // templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs')
        });
        reportAggregator.clean() ;

        global.reportAggregator = reportAggregator;
    },
    
    onComplete: function(exitCode, config, capabilities, results) {
        (async () => {
            await global.reportAggregator.createReport();
            let htmlReportFile =  path.resolve(__dirname,'../reports/master-report.html');
            let pdfFile = path.resolve(__dirname, '../reports/master-report.pdf');
            await printPdf(htmlReportFile, pdfFile) ;
        })();
    },
    
``` 

