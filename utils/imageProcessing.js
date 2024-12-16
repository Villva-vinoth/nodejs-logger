const { workerData, parentPort } = require('worker_threads');
const sharp = require('sharp');
const path = require('path');

const processImage = async (filePath) => {
  const outputFilePath = path.join(
    path.dirname(filePath),
    `${path.basename(filePath, path.extname(filePath))}-processed.png`
  );

  // await sharp(filePath)
  //   // .resize(300, 300, { fit: 'contain' }) // Resize to 300x300 pixels
  //   // .toFormat('jpeg')
  //   .png()
  //   // .jpeg({ quality: 80 })
  //   // .webp({ quality: 80 })
  //   .toFile(outputFilePath);

  return outputFilePath;
};

processImage(workerData.filePath)
  .then((outputFilePath) => {
    parentPort.postMessage(`${outputFilePath}`);
  })
  .catch((error) => {
    parentPort.postMessage(`Error: ${error.message}`);
  });
