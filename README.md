# wdio-html-reporter-pdf
Generate a pdf from an html-report.  
Requires version 6.1.0 of wdio-hmtl-reporter

## Installation

The easiest way is to keep the `@rpii/wdio-html-reporter-pdf` as a devDependency in your package.json:

```javascript
{
  "devDependencies": {
    "@rpii/wdio-html-reporter-pdf": "~6.1.3"
  }
}
```

## Configuration
Add a file called make-pdf.js in the root of the project.

There are difficulties in puppeteer if you try to integrate the code into wdio.conf.js.

The following code shows a simple way to add as a post build action.  you can invoke it from a pipeline if you are using jenkins.


```javascript / babel

// babel version
let printPdf = require('@rpii/wdio-html-reporter-pdf').default ;
(async () => {
            // need full paths
            let htmlReportFile =  path.resolve(__dirname,'reports/html-reports/master-report.html');
            let pdfFile = path.resolve(__dirname, 'reports/master-report.pdf');
            //for linux you will need these options
            let options = ['--no-sandbox','--disable-gpu','--disable-extensions'] ;
            await printPdf(htmlReportFile, pdfFile, options) ;
})();
    
``` 

Add a line to your package.json under scripts
```javascript
    "pdf": "node make-pdf.js"
``` 

## Usage
Run after completing a build.
