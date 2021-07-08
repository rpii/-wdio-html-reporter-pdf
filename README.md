# wdio-html-reporter-pdf
Generate a pdf from an html-report.  
Requires version 7.7.0 or later of wdio-hmtl-nice-reporter to generate the html report
#### Newest Features:

    Upgrade: rewritten in typescript, update puppeteer.  


## Installation

The easiest way is to keep the `@rpii/wdio-html-reporter-pdf` as a devDependency in your package.json:

```javascript
{
  "devDependencies": {
    "@rpii/wdio-html-reporter-pdf": "~7.0.0"
  }
}
```
## Updates

Updated version of puppeteer to get rid of issues.


## Configuration
Add a file called make-pdf.js in the root of the project.

There are difficulties in puppeteer if you try to integrate the code into wdio.conf.js.

The following code shows a simple way to add as a post build action.  you can invoke it from a pipeline if you are using jenkins.


```javascript / babel

// babel version
const path = require("path") ;
const fs = require("fs-extra") ;

let printPdf = require('@rpii/wdio-html-reporter-pdf').default ;

(async () => {
    let args = process.argv.slice(2) ;
    let reportName = args[0] ? args[0] : "master-report";

    try {

        // need full paths
        let htmlReportFile = path.resolve(__dirname, 'reports/html-reports/' + reportName + '.html');
        let pdfFile = path.resolve(__dirname, 'reports/' + reportName + '.pdf');
        //for linux you will need these options
        let options = ['--no-sandbox', '--disable-gpu', '--disable-extensions'];
        await printPdf(htmlReportFile, pdfFile, options);
    } catch (ex)  {
        console.error(ex);
    }
})();
    
``` 

Add a line to your package.json under scripts
```javascript
    "pdf": "node make-pdf.js"
``` 
To use an already installed chrome:  Add a line to your package.json under scripts

```javascript
    "pdf-chrome-linux": "node make-pdf.js /usr/bin/google-chrome"
``` 

## Usage
Run after completing a build.

If you need to specify a path to chrome, that is the fourth parameter.