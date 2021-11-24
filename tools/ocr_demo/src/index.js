const { createWorker } = require("tesseract.js");
// import txtpic from "./eng_bw.png";
import txtpic from "./a.png";
// import txtpic from "./b.png";
console.log(123);

const dom_status = document.getElementById("status");
const dom_progress = document.getElementById("progress");
const dom_result = document.getElementById("result");
const dom_pic = document.getElementById("txtpic");
dom_pic.src = txtpic;
const worker = createWorker({
  logger: (m) => {
    dom_status.innerText = m.status;
    dom_progress.innerText = (m.progress * 100).toFixed(2) + "%";
    console.log(m);
  }, // Add logger here
});

(async () => {
  await worker.load();
  await worker.loadLanguage("eng");//eng+hin
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(txtpic);
  console.log(text);
  dom_result.innerText = text;
  await worker.terminate();
})();
