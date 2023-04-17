import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';


export function loadPdf(base64String) {
    const binaryData = window.atob(base64String);
    const loadingTask = pdfjsLib.getDocument({ data: binaryData });
  
    return new Promise((resolve, reject) => {
      loadingTask.promise.then((pdf) => {
        const maxPages = pdf.numPages;
        const pagePromises = [];
  
        for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
          const page = pdf.getPage(pageNumber);
          pagePromises.push(page.then((page) => page.getTextContent()));
        }
  
        Promise.all(pagePromises).then((pages) => {
          const text = pages
            .map((page) =>
              page.items
                .map((item) => item.str)
                .join('')
                .trim()
            )
            .join(' ');
  
          resolve(text);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
  
  
  
