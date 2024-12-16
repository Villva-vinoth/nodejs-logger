const router = require('express').Router();
const {uploads} = require('../config/multer');
const { Worker } = require('worker_threads');
// const pro = require('../utils/imageProcessing.js')
const path = require('path');
const fs = require('fs')
router.post('/uploads',uploads.single('image'),async(req,res)=>{
   try {
    
     //    res.json({
     //        success:true,
     //         filepath: `/uploads/${req.file.filename}`
     //    })
     //    const reqsss =await req.file.filename
     //    console.log(reqsss)
     //    console.timeEnd("answer time")

     // const  filepath =  `../public/uploads/${req.file.filename}`

     const filePath = path.join(__dirname, '../public/uploads', req.file.filename);
     const workerScript = path.join(__dirname, '../utils/imageProcessing.js');
     console.log("image",filePath)
     const worker = new Worker(workerScript,{
          workerData : {
               filePath
          }
     });
      
        worker.on('message', (message) => {
             res.send(`Processing complete: ${message}`);   
          // res.download(message, () => {
               // Clean up: Delete the resized image after download
               // fs.unlinkSync(message);
               // fs.unlinkSync(filePath);
          //  });
          console.timeEnd("answer time")
        });
      
        worker.on('error', (err) => {
          console.error(err);
          res.status(500).send('Error processing file.');
        });
      
        worker.on('exit', (code) => {
          if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
          }
        });

     

//   let outpit=[]

//   for(let i =0;i<1e8; i++){
//     outpit.push(i)
//   }
//   res.json({
//      success:true,
//       filepath: `/uploads/${req.file.filename}`
//  })
//  console.timeEnd("answer time")
   } catch (error) {
    console.log(error)
   }
})

module.exports = router