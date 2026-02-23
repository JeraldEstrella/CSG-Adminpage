import * as pdfjs from "pdfjs-dist";
// Standard Vite worker loader
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default pdfjs;